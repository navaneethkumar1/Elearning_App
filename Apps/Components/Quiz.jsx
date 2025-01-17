// LanguageSelectionScreen.js

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PythonQuiz from '../QuizScreens/Pythonquiz'; // Assuming this is the correct import path

const Quiz = () => {
  const navigation = useNavigation();

  const handleLanguagePress = () => {
    // Navigate to the PythonQuiz screen
    navigation.navigate('PythonQuiz');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLanguagePress('C')}
      >
        <Text style={styles.buttonText}>C</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLanguagePress('C++')}
      >
        <Text style={styles.buttonText}>C++</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLanguagePress('Java')}
      >
        <Text style={styles.buttonText}>Java</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLanguagePress('PythonQuiz')}
      >
        <Text style={styles.buttonText}>Python</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLanguagePress('JavaScript')}
      >
        <Text style={styles.buttonText}>JavaScript</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLanguagePress('Reactjs')}
      >
        <Text style={styles.buttonText}>Reactjs</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF', // Background color of the screen
  },
  button: {
    width: '90%', // Adjust as needed for spacing
    marginBottom: 20,
    paddingVertical: 20,
    backgroundColor: '#0C7DE4', // Blue background color
    borderRadius: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0C7DE4', // Border color same as background for uniform look
  },
  buttonText: {
    color: '#FFFFFF', // White text color
    fontSize: 25,
  },
});

export default Quiz;
