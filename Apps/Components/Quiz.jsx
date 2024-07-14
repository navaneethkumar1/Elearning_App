import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';

const GEMINI_API_KEY = "YOUR_API_KEY"; // Replace with your actual API key

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [inputText, setInputText] = useState('');
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

            const options = optionsPart.split('\n').map(option => option.trim()).filter(option => !option.startsWith('**Answer:**'));
            console.log('Parsed Options:', options);

            if (questionPart && options.length > 0) {
              setMessages(prevMessages => [
                ...prevMessages,
                { text: questionPart, isBot: true, isQuestion: true },
                ...options.map((option, index) => ({ text: `${index + 1}. ${option}`, isBot: true, isOption: true }))
              ]);
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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {messages.map((message, index) => (
            <View key={index} style={message.isQuestion ? styles.questionContainer : styles.messageContainer}>
              <Text style={message.isBot ? styles.botText : styles.userText}>
                {message.text}
              </Text>
            </View>
          ))}

          {quizCompleted && (
            <View style={styles.quizCompletedContainer}>
              <Text style={styles.resultText}>{`Quiz completed! Your score is ${score}/10.`}</Text>
              <Button title="Retry Quiz" onPress={retryQuiz} />
            </View>
          )}
        </ScrollView>

        {!quizCompleted && (
          <View style={styles.inputContainer}>
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
      </View>
    </KeyboardAvoidingView>
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
  questionContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
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
