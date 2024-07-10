import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'
import { useNavigation } from '@react-navigation/native';
import { useClerk } from '@clerk/clerk-expo';
export default function ProfileScreen() {
    const navigation = useNavigation();
    const { signOut } = useClerk();
  
    const handleLogout = async () => {
      await signOut();
      navigation.replace('Login');
    }
  return (
    <View>
      <TouchableOpacity onPress={handleLogout}style={styles.logout_btn}><Text style={{color:Colors.white}}>Logout</Text></TouchableOpacity>
    </View>
  )
}
const styles=StyleSheet.create({
logout_btn:{
backgroundColor:Colors.Primary,
padding:18,
margin:30,
borderRadius:10,
alignItems:'center',
marginTop:730
}
})