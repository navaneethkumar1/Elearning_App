import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'

export default function ProfileScreen() {
  return (
    <View>
      <Text>ProfileScreen</Text>
      <TouchableOpacity style={styles.logout_btn}></TouchableOpacity>
    </View>
  )
}
const styles=StyleSheet.create({
logout_btn:{

}
})