import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';

export default SignUp1 = ({ navigation }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repeatPassword, setRepeatPassword ] = useState('');
  const [ under18, setUnder18 ] = useState(null);

  const under18Btns = [
    {
      label: 'Yes',
      value: false,
     },
     {
      label: 'No',
      value: true,
     }
  ];

  const nextPage = () => {
    if (password === repeatPassword) {
      navigation.navigate('Sign Up 2', { email, password, under18 })
    } else {
      Alert.alert('Passwords don\'t match');
    }
  }

  const nextPageBtn = email.length && password.length && under18 !== null ? (
    <Button title="Next" onPress={nextPage} />
  ) : (
    <Button title="Next" disabled />
  )

  return (
    <View>
      <Text>Create your account</Text>
      <TextInput textContentType="emailAddress" value={email} onChangeText={setEmail} placeholder="Email" />
      <TextInput textContentType="newPassword" value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry={true} />
      <TextInput textContentType="newPassword" value={repeatPassword} onChangeText={setRepeatPassword} placeholder="Repeat Password" secureTextEntry={true} />
      <Text>Are you 18 or older?</Text>
      <RadioButtonRN
        data={under18Btns}
        selectedBtn={ e => setUnder18(e.value) }
      />
      {nextPageBtn}
    </View>
  )
}
