import { View, Text, Dimensions, Button, TouchableOpacity } from 'react-native'
import {Image} from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import Colors from '../Color/Colors';
const {width,height}=Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';//google icon
export default function Login() {
  return (
    <View>
        <View >
        <Image style={styles.loginImage} source={require('../../assets/Images/login.jpeg')}/>
        </View>
        <View style={styles.container}>
      <Text style={styles.welcometext}>Welcome to <Text style={{color:Colors.red}}>EduBox</Text></Text>
      <Text style={{textAlign:'center',fontSize:20,marginTop:250,color:Colors.grey}}>Your Coding Adventure Starts Here</Text>
      <TouchableOpacity style={styles.Button}>
      <Ionicons name="logo-google" size={24} color="white" style={{marginRight:10}} />
        <Text style={{color:Colors.white}}>Signin with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity><Text style={styles.create}>Create New Account</Text></TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    loginImage:{
        width:width,
        height:height*0.45,
        resizeMode: 'cover',
    },
    container:{
paddingTop:50,
marginTop:-38,
backgroundColor:'#fff',
borderTopRightRadius:35,
borderTopLeftRadius:30
    },
  welcometext:{
    fontSize:35,
    textAlign:'center',
    fontWeight:'bold'
  },
  Button:{
    backgroundColor:Colors.Primary,
    padding:10,
    margin:30,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  },
  create:{
    textAlign:'center',
    fontSize:20
  }
})
