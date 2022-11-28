import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import * as Crypto from 'expo-crypto';
import axios from 'axios';
import config from '../../config.js';

export default LogIn = ({ navigation }) => {
  const [ user_email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleEmailChange = text => {
    setEmail(text);
  }

  const handlePasswordChange = text => {
    setPassword(text);
  }

  const authenticateUser = (email, pwd) => {
    axios.get(`http://${config.localIP}:${config.port}/login?user_email=${email}$hashed_password_attempt=${pwd}`)
      .then(result => {
        console.log(result);
        if (result === 'incorrect email') {
          Alert.alert('Incorrect email')
        } else if (result === 'incorrect password') {
          Alert.alert('Incorrect password')
        } else {
          navigation.navigate('App', { user: result.id });
        }
      })
  }

  const onLogIn = async () => {
    const hashed_password_attempt = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    authenticateUser(user_email, hashed_password_attempt);
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
