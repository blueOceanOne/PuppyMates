import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import * as Crypto from 'expo-crypto';

export default LogIn = ({ navigation }) => {
  const [ user_email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleEmailChange = text => {
    setEmail(text);
  }

  const handlePasswordChange = text => {
    setPassword(text);
  }

  const onLogIn = async () => {
    const hashed_password_attempt = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    console.log({ user_email, hashed_password_attempt })
    navigation.navigate('App');
  }

  const LogInBtn = user_email.length && password.length ? (
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
      <TextInput textContentType="emailAddress" value={user_email} onChangeText={handleEmailChange} placeholder="Email" />
      <TextInput textContentType="password" value={password} onChangeText={handlePasswordChange} placeholder="Password" secureTextEntry={true} />
      {LogInBtn}
      <Button title="Create an account" onPress={SignUp} />
    </View>
  )
}
