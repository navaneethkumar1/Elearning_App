// import { View, Text, TouchableOpacity,StyleSheet,Image } from 'react-native'
// import React from 'react'
// import Colors from '../Utils/Colors'
// import { useNavigation } from '@react-navigation/native';
// import { useClerk, useUser } from '@clerk/clerk-expo';
// import { Ionicons } from '@expo/vector-icons';
// import {LinearGradient} from 'expo-linear-gradient';
// export default function ProfileScreen() {
//     const navigation = useNavigation();
//     const { signOut } = useClerk();
  
//     const handleLogout = async () => {
//       await signOut();
//       navigation.replace('Login');
     
    
    
//     }
//       //display user info
//     const {user}=useUser();

//   return (
//     <View>
//          <LinearGradient 
//   colors={['#ffffff', '#b3d1f7', '#a1c8f7', '#b3d1f7', '#ffffff']}
//   style={styles.heading}
//   start={{ x: 0, y: 0 }}
//   end={{ x: 1, y: 1 }}
//             >
//       <View style={styles.head}>
//         <Text style={styles.headingText}>EduBox</Text>
//       </View>
//       </LinearGradient>
//       <View style={styles.userinfo}>
//         <Image source={{ uri:user?.imageUrl}} style={{width:90,height:90,borderRadius:99}} />
//         <Text style={{fontSize:35}}>{user.fullName}</Text>
//         <Text style={{fontSize:20}}>{user?.primaryEmailAddress.emailAddress}</Text>
//       </View>
//       <TouchableOpacity onPress={handleLogout}style={styles.logout_btn}>
//       <Ionicons name="log-out-outline" size={30} color="white" />
//         <Text style={{color:Colors.white,fontSize:20}}>Logout</Text>
//         </TouchableOpacity>
//     </View>
//   )
// }
// const styles=StyleSheet.create({
// logout_btn:{
// backgroundColor:Colors.Primary,
// padding:13,
// margin:20,
// borderRadius:10,
// marginTop:520,
// display:'flex',
// flexDirection:'row',
// gap:10,
// alignItems:'center',
// justifyContent:'center'

// },
// userinfo:{
//   marginTop:30,
//   marginLeft:10,
//   padding:10,
//   display:'flex',
//   flexDirection:'column',
//   alignItems:'center'
// },
// head:{
//   marginTop:24,
//   padding:30,
// alignItems:'center',
// },
// headingText: {
//   color: '#333333',
//   fontSize: 30,
//   fontWeight: 'bold',
//   textAlign: 'center',
// },
// })
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useClerk, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../Utils/Colors';

export default function ProfileScreen() {
    const navigation = useNavigation();
    const { signOut } = useClerk();
    const { user } = useUser();

    const handleLogout = async () => {
        await signOut();
        navigation.replace('Login');
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#ffffff', '#b3d1f7', '#a1c8f7', '#b3d1f7', '#ffffff']}
                style={styles.heading}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.head}>
                    <Text style={styles.headingText}>EduBox</Text>
                </View>
            </LinearGradient>
            <View style={styles.userinfo}>
                <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
                <Text style={styles.fullName}>{user.fullName}</Text>
                <Text style={styles.email}>{user?.primaryEmailAddress.emailAddress}</Text>
            </View>
            <TouchableOpacity onPress={handleLogout} style={styles.logout_btn}>
                <Ionicons name="log-out-outline" size={30} color="white" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    heading: {
        paddingTop: 28,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    head: {
        alignItems: 'center',
    },
    headingText: {
        color: '#333333',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    userinfo: {
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    userImage: {
        width: 90,
        height: 90,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: Colors.Primary,
        marginBottom: 10,
        marginTop:15
    },
    fullName: {
        fontSize: 30,
        fontWeight: 'bold',
        color:'#333333',
        marginTop:15,
    },
    email: {
      marginTop:15,
        fontSize: 20,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    logout_btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.Primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        margin: 20,
        marginTop: 'auto', // Pushes the button to the bottom
    },
    logoutText: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10,
    },
});
