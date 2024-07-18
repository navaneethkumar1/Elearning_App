import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Apps/Components/Login';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import Tabnavigations from './Apps/Navigations/Tabnavigations';
import { useFonts } from 'expo-font'; //fontss
import StackNavigation from './Apps/Navigations/Stacknavigation';

export default function App() {
  const [loaded, error] = useFonts({
    'outfit': require('./assets/Fonts/Outfit-Regular.ttf'),//fonts 
    'outfit-medium': require('./assets/Fonts/Outfit-Medium.ttf'),//fonts 
    'outfit': require('./assets/Fonts/Outfit-Bold.ttf'),//fonts 
  });
  return (
  
      <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        {/* <SignedIn> */}
        <NavigationContainer>
          <Tabnavigations/>
          <StackNavigation/>
        </NavigationContainer>
        {/* </SignedIn> */}

        {/* <SignedOut>
          <Login/>
        </SignedOut> */}

      </ClerkProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
