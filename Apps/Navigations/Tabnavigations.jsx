import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen  from '../Components/HomeScreen';
import ProfileScreen from '../Components/ProfileScreen';
import MyCoursesScreen from '../Components/MyCourses';
import Quiz from '../Components/Quiz';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../Utils/Colors';

import { Ionicons } from '@expo/vector-icons';

const Tab=createBottomTabNavigator();
export default function Tabnavigations() {
  return (

        <Tab.Navigator screenOptions={{headerShown:false,tabBarActiveTinColor:Colors.Primary}} >
            <Tab.Screen options={{tabBarIcon:(color,size)=>(
                <Ionicons name="home" size={24} color={Colors.Primary}/>
            ),
            tabBarLabel:()=>(
                <Text style={{color:Colors.Primary}}>Home</Text>
            )
        }}name='Home' component={HomeScreen}/>

            <Tab.Screen options={{tabBarIcon:(color,size)=>(
                <Ionicons name="book" size={24} color={Colors.Primary}/>
            ),
            tabBarLabel:()=>(
                <Text style={{color:Colors.Primary}}>MyCourses</Text>
            )
        }} name='MyCourses' component={MyCoursesScreen}/>

<Tab.Screen options={{tabBarIcon:(color,size)=>(  <Ionicons name="book" size={24} color={Colors.Primary}/>
),
        tabBarLabel:()=>(
            <Text style={{color:Colors.Primary}}>Quiz</Text>
        )
            }}name='quiz' component={Quiz}/>
            <Tab.Screen options={{tabBarIcon:(color,size)=>(
                <Ionicons name="person" size={24} color={Colors.Primary}/>
            ),
            tabBarLabel:()=>(
                <Text style={{color:Colors.Primary}}>Profile</Text>
            )
        }} name='Profile' component={ProfileScreen}/> 

        </Tab.Navigator>

  )
}