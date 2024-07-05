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
      <Text style={styles.welcometext}>Welcome to <Text style={{color:Colors.Primary}}>EduBox</Text></Text>
      <Text style={styles.subtitle}>Your Coding Adventure Starts Here</Text>
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
        height:height*0.5,
        resizeMode: 'cover',
        marginTop:-80,
    },
    container:{
paddingTop:30,
marginTop:-50,
backgroundColor:'#fff',
borderTopRightRadius:30,
borderTopLeftRadius:30
    },
  welcometext:{
    fontSize:35,
    textAlign:'center',
    fontWeight:'bold'
  },
  Button:{
    backgroundColor:Colors.Primary,
    padding:15,
    margin:30,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:16,
  },
  subtitle:{
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    marginBottom:130,
    color: Colors.grey,
  },
  create:{
    textAlign:'center',
    fontSize:18,
    color:Colors.Primary
  }
})
