// 
import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getCourseList } from '../Utils/GlobalApi';
import Header from './Header';
import CourseList from './CourseList';

export default function HomeScreen() {


  return (
    <View style={styles.container}>
      <Header />
  
    </View>
  );
}

const styles = StyleSheet.create({

});
