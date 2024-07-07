import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Apps/Components/Login';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import Welcome from './Apps/Components/Welcome';
export default function App() {
  return (
    <View style={styles.container}>
      <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <SignedIn>
        <Welcome/>
        </SignedIn>
        <SignedOut>
          <Login/>
        </SignedOut>

      </ClerkProvider>
    </View>
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
