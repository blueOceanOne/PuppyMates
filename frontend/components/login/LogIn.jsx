import React, { useState } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, View, Button, Alert, SafeAreaView } from 'react-native';
import { Input } from '@rneui/themed';
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

  // const authenticateUser = (email, pwd) => {
  //   axios.get(`http://${config.localIP}:${config.port}/login?user_email=${email}$hashed_password_attempt=${pwd}`)
  //     .then(result => {
  //       console.log(result);
  //       if (result === 'incorrect email') {
  //         Alert.alert('Incorrect email')
  //       } else if (result === 'incorrect password') {
  //         Alert.alert('Incorrect password')
  //       } else {
  //         navigation.navigate('App', { user: result.id });
  //       }
  //     })
  // }

  const onLogIn = async () => {
    // const hashed_password_attempt = await Crypto.digestStringAsync(
    //   Crypto.CryptoDigestAlgorithm.SHA256,
    //   password
    // );
    // authenticateUser(user_email, hashed_password_attempt);
    setEmail('');
    setPassword('');
    navigation.navigate('App');
  }

  const LogInBtn = user_email.length && password.length ? (
    <Button onPress={onLogIn} color='#F49D1A' type='outline' title="Log In" />
  ) : (
    <Button title="Log In" disabled />
  )

  const SignUp = () => {
    navigation.navigate('Sign Up 1')
  }

  return (
      <KeyboardAvoidingView behavior="padding" enabled style={styles.white}>
        <View style={styles.logo}>
          <Text style={styles.title}>puppymates</Text>
        </View>
        <Input textContentType="emailAddress" value={user_email} onChangeText={handleEmailChange} placeholder="Email" />
        <Input textContentType="password" value={password} onChangeText={handlePasswordChange} placeholder="Password" secureTextEntry={true} />
        {LogInBtn}
        <Button title="Create an account" color='#F49D1A' onPress={SignUp} />
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  title: {
    color: '#F49D1A',
    fontSize: '34px',
  },
  logo: {
    alignSelf: 'center',
    paddingVertical: 270
  },
  white: {
    backgroundColor: 'white',
  }
})