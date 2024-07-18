import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';

const GEMINI_API_KEY = "AIzaSyBbL6D2BCdXnSDIM9wBlHSyHrumaH0Zqp4"; // Replace with your actual API key

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

          const splitIndex = combinedResponse.indexOf('**Answer:**');
          if (splitIndex !== -1) {
            const questionPart = combinedResponse.slice(0, splitIndex).trim();
            const answerPart = combinedResponse.slice(splitIndex + 11).trim(); // Skip '**Answer:**' (11 characters)
            console.log('Question:', questionPart);
            console.log('Answer:', answerPart);

            const options = questionPart.split('\n').map(option => option.trim()).filter(option => option !== '');
            console.log('Parsed Options:', options);

            if (options.length > 0) {
              // Generate options in lowercase for case-insensitive comparison
              const formattedOptions = options.map(option => option.toLowerCase());
              setMessages(prevMessages => [
                ...prevMessages,
                { text: options[0], isBot: true }, // Display the question
                ...formattedOptions.slice(1).map(option => ({ text: option, isBot: true })) // Display the options
              ]);
              setCorrectAnswer(answerPart.charAt(0).toLowerCase()); // Assuming the correct answer is the first option's first character
            } else {
              console.error('Invalid response format: missing question or options');
              setMessages(prevMessages => [
                ...prevMessages,
                { text: 'Invalid response format: missing question or options', isBot: true, isError: true }
              ]);
            }
          } else {
            console.error('Invalid response format: missing "**Answer:**" separator');
            setMessages(prevMessages => [
              ...prevMessages,
              { text: 'Invalid response format: missing "**Answer:**" separator', isBot: true, isError: true }
            ]);
          }
        } else {
          console.error('Invalid response format: missing content parts');
          setMessages(prevMessages => [
            ...prevMessages,
            { text: 'Invalid response format: missing content parts', isBot: true, isError: true }
          ]);
        }
      } else {
        console.error('Invalid response format: missing candidates');
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'Invalid response format: missing candidates', isBot: true, isError: true }
        ]);
      }

      setIsBotTyping(false);
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: 'Error fetching data from the API', isBot: true, isError: true }
      ]);
      setIsBotTyping(false);
    }
  };

  const handleSubmitted = () => {
    const normalizedInput = inputText.trim().toLowerCase();
    if (normalizedInput === correctAnswer.toLowerCase()) {
      setScore(prevScore => prevScore + 1);
    }
    setMessages(prevMessages => [...prevMessages, { text: inputText, isBot: false }]);
    setInputText('');
    setQuestionCount(prevCount => prevCount + 1);

    if (questionCount < 9) {
      setTimeout(() => {
        sendBotMessage('Generate a simple Python question with four options.');
      }, 1000); // 1 second delay before sending the next question
    } else {
      setQuizCompleted(true);
    }
  };

  const retryQuiz = () => {
    setMessages([]);
    setQuestionCount(0);
    setScore(0);
    setQuizCompleted(false);
    // Delay sending the bot message to ensure the UI reset first
    setTimeout(() => {
      sendBotMessage('Generate a simple Python question with four options.');
    }, 800); // Adjust delay as needed
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {messages.map((message, index) => (
            <View key={index} style={styles.messageContainer}>
              <Text style={message.isBot ? styles.botText : styles.userText}>
                {message.text}
              </Text>
            </View>
          ))}

          {/* Display quiz completion message */}
          {quizCompleted && messages.length > 0 && (
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
    padding: 8,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  botText: {
    fontSize: 17,
    color: 'black',
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
