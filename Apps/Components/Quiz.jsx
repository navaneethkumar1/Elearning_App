import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const GEMINI_API_KEY = "AIzaSyBbL6D2BCdXnSDIM9wBlHSyHrumaH0Zqp4"; // Replace with your actual API key

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [inputText, setInputText] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    sendBotMessage('Generate a simple Python question with four options.');
  }, []);

  const sendBotMessage = async (prompt) => {
    setIsBotTyping(true);
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }
      );

      console.log('API response:', response.data);

      const candidates = response.data.candidates;
      if (candidates && candidates.length > 0) {
        const content = candidates[0].content;
        if (content && content.parts && content.parts.length > 0) {
          const combinedResponse = content.parts[0].text;
          console.log('Combined response:', combinedResponse);

          // Check if options are embedded directly in the response
          const splitIndex = combinedResponse.indexOf('**Answer:**');
          if (splitIndex !== -1) {
            const questionPart = combinedResponse.slice(0, splitIndex).trim();
            const optionsPart = combinedResponse.slice(splitIndex + 11).trim(); // Skip '**Answer:**' (11 characters)
            console.log('Question:', questionPart);
            console.log('Options:', optionsPart);

            const options = optionsPart.split('\n').map(option => option.trim());
            console.log('Parsed Options:', options);

            if (questionPart && options.length > 0) {
              setMessages(prevMessages => [...prevMessages, { text: questionPart, isBot: true }]);
              setCurrentQuestion(questionPart);
              setCurrentOptions(options);
              setCorrectAnswer(options[0].charAt(0).toLowerCase()); // Assuming the correct answer is the first option's first character
            } else {
              console.error('Invalid response format: missing question or options');
            }
          } else {
            console.error('Invalid response format: missing "**Answer:**" separator');
          }
        } else {
          console.error('Invalid response format: missing content parts');
        }
      } else {
        console.error('Invalid response format: missing candidates');
      }

      setIsBotTyping(false);
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
      setIsBotTyping(false);
    }
  };

  const handleSubmitted = () => {
    if (inputText.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setScore(prevScore => prevScore + 1);
    }
    setMessages(prevMessages => [...prevMessages, { text: inputText, isBot: false }]);
    setInputText('');
    setQuestionCount(prevCount => prevCount + 1);

    if (questionCount < 9) {
      sendBotMessage('Generate a simple Python question with four options.');
    } else {
      setQuizCompleted(true);
      setMessages(prevMessages => [...prevMessages, { text: `Quiz completed! Your score is ${score}/10.`, isBot: true }]);
    }
  };

  const retryQuiz = () => {
    setMessages([]);
    setQuestionCount(0);
    setScore(0);
    setQuizCompleted(false);
    sendBotMessage('Generate a simple Python question with four options.');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {messages.map((message, index) => (
          <View key={index} style={styles.messageContainer}>
            <Text style={message.isBot ? styles.botText : styles.userText}>
              {message.text}
            </Text>
          </View>
        ))}

        {!quizCompleted && currentQuestion && (
          <View style={styles.inputContainer}>
            <Text style={styles.questionText}>{currentQuestion}</Text>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Enter your answer"
              editable={!isBotTyping}
            />
            <Button
              title="Submit"
              onPress={handleSubmitted}
              disabled={isBotTyping}
            />
          </View>
        )}

        {quizCompleted && (
          <View style={styles.quizCompletedContainer}>
            <Text style={styles.resultText}>{`Quiz completed! Your score is ${score}/10.`}</Text>
            <Button title="Retry Quiz" onPress={retryQuiz} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  botText: {
    fontSize: 16,
    color: 'green',
  },
  userText: {
    fontSize: 16,
    color: 'blue',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  quizCompletedContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default ChatScreen;
