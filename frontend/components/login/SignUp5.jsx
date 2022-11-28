import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import _ from 'underscore';
import * as Crypto from 'expo-crypto';
import * as Location from 'expo-location';
import axios from 'axios';
import config from '../../config.js';

export default SignUp5 = ({ navigation, route }) => {
  const [ bio, setBio ] = useState('');

  const addUser = (obj) => {
    axios.post(`http://${config.localIP}:${config.port}/signup`, obj)
      .then(() => {
        axios.get(`http://${config.localIP}:${config.port}/login?user_email=${obj.user_email}&hashed_password_attempt=${obj.hashed_password}`)
          .then(result  => {
            navigation.navigate('App', { user: result.id });
          })
      })
  }

  const finish = async () => {
    const props = _.extend(route.params, { bio });
    props.hashed_password = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      props.password
    );
    const location = await Location.getCurrentPositionAsync({});
    props.longitude = location.coords.longitude;
    props.latitude = location.coords.latitude;
    delete props.password;
    addUser(props);
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
