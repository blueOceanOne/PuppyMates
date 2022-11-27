import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import RequestDetail from './RequestDetail.jsx';
import config from '../../config.js';
import axios from 'axios';

const Requests = ({selectedRequest, setSelectedRequest, user, pending, setPending}) => {
  const navigation = useNavigation();

  return (
    <View>
      <Text style={styles.text}>Pending requests</Text>
        <View style={styles.requestCards}>
        {
          pending.map((item, i) => (
            <TouchableWithoutFeedback
              key={i}
              onPress = {(event) => {
              event.preventDefault();
              setSelectedRequest(item.sender_id);
              navigation.navigate('RequestDetail');
            }}>
              <View style={styles.request}>
                <Image style={styles.image} source={{uri:item.request_sender.photos[0].url}}></Image>
                <Text style={styles.name}>{item.request_sender.dog_name}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))
        }
        </View>
    </View>
  )
}

export default Requests;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 8
  },

  requestCards: {
    flexDirection: 'row',
    justifyContent: 'space'
  },

  request: {
    width: 90,
    height: 120,
    borderRadius: 15,
    backgroundColor: '#FFE15D',
    marginHorizontal: 8,
    marginTop: 10
  },

  image: {
    height: 90,
    width: 90,
    borderRadius: 15
  },

  name: {
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '500'
  }
})


