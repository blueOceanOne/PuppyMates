import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import CheckBox from 'expo-checkbox';

export default SignUp1 = ({ navigation }) => {
  const [ user_email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repeatPassword, setRepeatPassword ] = useState('');
  const [ toggleCheckBox, setToggleCheckBox ] = useState(false);

  const nextPage = () => {
    if (password === repeatPassword) {
      navigation.navigate('Sign Up 2', { user_email, password })
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
    <View>
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
    </View>
  )
}
