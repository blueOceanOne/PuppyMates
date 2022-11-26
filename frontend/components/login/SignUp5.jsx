import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import _ from 'underscore';

export default SignUp5 = ({ navigation, route }) => {
  const [ bio, setBio ] = useState('');

  const finish = () => {
    const props = _.extend(route.params, { bio });
    console.log(props);
    navigation.navigate('App')
  }

  const finishBtn = bio.length ? (
    <Button title="Finish" onPress={finish} />
  ): (
    <Button title="Finish" disabled />
  )

  return (
    <View>
      <Text>Tell us about your pup</Text>
      <TextInput value={bio} onChangeText={setBio} placeholder="Anything else you'd like other pup owners to know about your pup? Let everyone know in this bio!" multiline numberOfLines={5} />
      {finishBtn}
    </View>
  )
}
