import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, SafeAreaView } from 'react-native';
import CheckBox from 'expo-checkbox';
import axios from 'axios';

export default SignUp1 = ({ navigation }) => {
  const [ user_email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repeatPassword, setRepeatPassword ] = useState('');
  const [ toggleCheckBox, setToggleCheckBox ] = useState(false);

  // const checkEmail = (email) => {
  //   axios.get(`http://${config.localIP}:${config.port}email?user_email=${email}`)
  //     .then(result => {
  //       if (result) navigation.navigate('Sign Up 2', { user_email, password });
  //       else Alert.alert('There is already an account associated with this email');
  //     })
  // }

  const nextPage = () => {
    if (password === repeatPassword) {

    } else {
      Alert.alert('Passwords don\'t match');
    }
  }

  const nextPageBtn = user_email.length && password.length && toggleCheckBox ? (
    <Button title="Next" onPress={nextPage} />
  ) : (
    <Button title="Next" disabled />
  )

  return (
    <SafeAreaView>
      <Text>Create your account</Text>
      <TextInput textContentType="emailAddress" value={user_email} onChangeText={setEmail} placeholder="Email" />
      <TextInput textContentType="newPassword" value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry={true} />
      <TextInput textContentType="newPassword" value={repeatPassword} onChangeText={setRepeatPassword} placeholder="Repeat Password" secureTextEntry={true} />
      <Text>Are you 18 or older?</Text>
      <CheckBox
        value={toggleCheckBox}
        onValueChange={setToggleCheckBox}
      />
      {nextPageBtn}
    </SafeAreaView>
  )
}
