import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default LogIn = ({ navigation }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleEmailChange = text => {
    setEmail(text);
  }

  const handlePasswordChange = text => {
    setPassword(text);
  }

  const onLogIn = () => {
    navigation.navigate('App');
  }

  const LogInBtn = email.length && password.length ? (
    <Button onPress={onLogIn} title="Log In" />
  ) : (
    <Button title="Log In" disabled />
  )

  const SignUp = () => {
    navigation.navigate('Sign Up 1')
  }

  return (
    <View>
      <Text>PuppyMates</Text>
      <TextInput textContentType="emailAddress" value={email} onChangeText={handleEmailChange} placeholder="Email" />
      <TextInput textContentType="password" value={password} onChangeText={handlePasswordChange} placeholder="Password" secureTextEntry={true} />
      {LogInBtn}
      <Button title="Create an account" onPress={SignUp} />
    </View>
  )
}
