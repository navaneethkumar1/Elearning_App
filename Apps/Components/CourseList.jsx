import { View, Text} from 'react-native'
import { useEffect } from 'react';
import React from 'react'
import { getCourseList } from '../Utils/GlobalApi';
export default function CourseList() {
    
  useEffect(() => {
    getCourses();
  }, []);

//   const getCourses = async () => {
//     getCourseList.then(resp=>{
//       console.long("resp",resp);
//     })
//   };
const getCourses = async () => {
    try {
      const resp = await getCourseList();
      console.log("resp", resp);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  return (
    <View>
      <Text>CourseList</Text>
    </View>
  )
}