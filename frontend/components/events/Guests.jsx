import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Pressable, Button, StyleSheet } from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';
import userData from '../home/exampleData/userData.js';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import config from '../../config.js';
import Guest from './Guest.jsx';

const Guests = ({invitees, matches, setInvitees}) => {
  const navigation = useNavigation();
  const sampleData = userData;

  const handleInvite = (guestId) => {
    const userIdInList = invitees.indexOf(guestId);
    if (userIdInList !== -1) {
      invitees.splice(userIdInList, 1);
    } else {
      invitees.push(guestId);
      setInvitees([...invitees]);
    }
  };

  const handleConfirm = () => {
    navigation.navigate('Create Event');
  }

  return (
    <ScrollView>
      <Button title='Confirm Guests' onPress={handleConfirm}/>
      { matches.map((each) => {
        console.log(each);
        return (
        <Guest handleInvite={handleInvite} guest={each} />
        )
      })}
    </ScrollView>
  )
}

export default Guests;

const gap = 8;
const styles = StyleSheet.create({
  selectedGuest: {
    backgroundColor: '#2D70F9',
  },
  guestPressable: {
    flex: 1,
    padding: 12
  },
  guestCard: {
    flex: 1,
    flexDirection: 'row',
  },
  info:{
    marginLeft: 10,
    fontSize: 17,
    justifyContent: 'center',
    paddingTop: 8
  }
})

//DELET AFTER USE
// [
//   {
//     "createdAt": "2022-11-22T23:56:46.615Z", "id": 9, "recipient_id": 7,
//     "request_recipient": { "dog_name": "Astro", "id": 7, "photos": [Array] },
//     "sender_id": 1, "status": "accepted", "updatedAt": "2022-11-22T23:56:46.615Z"
//     }
//   {
//     "createdAt": "2022-11-22T23:56:46.615Z", "id": 2, "recipient_id": 51,
//     "request_recipient": {"dog_name": "Bobby", "id": 51, "photos": [Array]},
//     "sender_id": 1, "status": "accepted", "updatedAt": "2022-11-22T23:56:46.615Z"
//   },
//   {
//     "createdAt": "2022-11-22T23:56:46.615Z", "id": 5, "recipient_id": 77,
//     "request_recipient": {"dog_name": "Tess", "id": 77, "photos": [Array]},
//     "sender_id": 1, "status": "accepted", "updatedAt": "2022-11-22T23:56:46.615Z"
//   },
//   {
//     "createdAt": "2022-11-22T23:56:46.615Z", "id": 4, "recipient_id": 105,
//     "request_recipient": {"dog_name": "Petra", "id": 105, "photos": [Array]},
//     "sender_id": 1, "status": "accepted", "updatedAt": "2022-11-22T23:56:46.615Z"
//   },
//   {
//     "createdAt": "2022-11-22T23:56:46.615Z", "id": 11, "recipient_id": 116,
//     "request_recipient": {"dog_name": "Tiger", "id": 116, "photos": [Array]},
//     "sender_id": 1, "status": "accepted", "updatedAt": "2022-11-22T23:56:46.615Z"
//   }
// ]