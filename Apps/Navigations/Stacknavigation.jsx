// StackNavigator.js or App.js

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Quiz from '../Components/Quiz';
import PythonQuiz from '../QuizScreens/Pythonquiz'; // Import PythonQuiz screen

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Quiz">
      <Stack.Screen name="Quiz" component={Quiz} options={{ title: 'Select Language' }} />
      <Stack.Screen name="PythonQuiz" component={PythonQuiz} options={{ title: 'Python Quiz' }} /> {/* Add PythonQuiz screen */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
