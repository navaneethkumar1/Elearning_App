import { View, Text, TouchableOpacity,StyleSheet,Image } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'
import { useNavigation } from '@react-navigation/native';
import { useClerk, useUser } from '@clerk/clerk-expo';
export default function ProfileScreen() {
    const navigation = useNavigation();
    const { signOut } = useClerk();
  
    const handleLogout = async () => {
      await signOut();
      navigation.replace('Login');
     
    
    
    }
      //display user info
    const {user}=useUser();

  return (
    <View>
      <View style={styles.userinfo}>
        <Image source={{ uri:user?.imageUrl}} style={{width:90,height:90,borderRadius:99}} />
        <Text style={{fontSize:30,alignItems:'center'}}>{user.fullName}</Text>
        <Text style={{fontSize:20}}>{user?.primaryEmailAddress.emailAddress}</Text>
      </View>
      <TouchableOpacity onPress={handleLogout}style={styles.logout_btn}>
        <Text style={{color:Colors.white}}>Logout</Text>
        </TouchableOpacity>
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
marginTop:500
},
userinfo:{
  marginTop:30,
  marginLeft:10,
  padding:10,
  display:'flex',
  flexDirection:'column',
  alignItems:'center'
}
})