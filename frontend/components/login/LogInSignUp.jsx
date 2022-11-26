import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from './LogIn.jsx';
import SignUp1 from './SignUp1.jsx';
import SignUp2 from './SignUp2.jsx';
import SignUp3 from './SignUp3.jsx';
import SignUp4 from './SignUp4.jsx';
import SignUp5 from './SignUp5.jsx';

const Stack = createNativeStackNavigator();

export default LogInSignUp = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Log In" component={LogIn} />
      <Stack.Group screenOptions={{title: 'Sign Up'}}>
        <Stack.Screen name="Sign Up 1" component={SignUp1} />
        <Stack.Screen name="Sign Up 2" component={SignUp2} />
        <Stack.Screen name="Sign Up 3" component={SignUp3} />
        <Stack.Screen name="Sign Up 4" component={SignUp4} />
        <Stack.Screen name="Sign Up 5" component={SignUp5} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
