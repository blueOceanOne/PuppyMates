import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInSignUp from './login/LogInSignUp.jsx';
import NavBar from './NavBar.jsx';

const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Log In Sign Up"
          options={{ headerShown: false }}
          component={LogInSignUp}
        /> */}
        <Stack.Screen
          name="App"
          options={{
            title: 'puppymates',
            headerBackVisible: false,
            headerShadowVisible: false,
            headerTintColor: '#F49D1A',
            headerTitleStyle: {
              color: '#F49D1A',
              fontSize: '24px',
            },
          }}
          component={NavBar}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
