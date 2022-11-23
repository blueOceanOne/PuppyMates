import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from './LogIn.jsx';
import SignUp1 from './SignUp1.jsx';
import SignUp2 from './SignUp2.jsx';
import SignUp3 from './SignUp3.jsx';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Log In"
          component={LogIn}
        />
        <Stack.Group screenOptions={{title: 'Sign Up'}}>
          <Stack.Screen name="Sign Up 1" component={SignUp1} />
          <Stack.Screen name="Sign Up 2" component={SignUp2} />
          <Stack.Screen name="Sign Up 3" component={SignUp3} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
