import { View, Text, TouchableOpacity,StyleSheet,Image } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'
import { useNavigation } from '@react-navigation/native';
import { useClerk, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
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
         <LinearGradient 
                colors={['#ffffff', '#0C7DE4', '#0C7DE4', '#ffffff']}
                style={styles.heading}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
      <View style={styles.head}>
        <Text style={{fontSize:30,color:'white'}}>EduBox</Text>
      </View>
      </LinearGradient>
      <View style={styles.userinfo}>
        <Image source={{ uri:user?.imageUrl}} style={{width:90,height:90,borderRadius:99}} />
        <Text style={{fontSize:35}}>{user.fullName}</Text>
        <Text style={{fontSize:20}}>{user?.primaryEmailAddress.emailAddress}</Text>
      </View>
      <TouchableOpacity onPress={handleLogout}style={styles.logout_btn}>
      <Ionicons name="log-out-outline" size={30} color="white" />
        <Text style={{color:Colors.white,fontSize:20}}>Logout</Text>
        </TouchableOpacity>
    </View>
  )
}
const styles=StyleSheet.create({
logout_btn:{
backgroundColor:Colors.Primary,
padding:13,
margin:20,
borderRadius:10,
marginTop:520,
display:'flex',
flexDirection:'row',
gap:10,
alignItems:'center',
justifyContent:'center'

},
userinfo:{
  marginTop:30,
  marginLeft:10,
  padding:10,
  display:'flex',
  flexDirection:'column',
  alignItems:'center'
},
head:{
  marginTop:24,
  padding:30,
alignItems:'center',

}
})