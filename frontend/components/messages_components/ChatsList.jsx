import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'
import ChatPage from './ChatPage.jsx';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { ListItem, Avatar } from '@rneui/themed';
import config from '../../config.js';
import axios from 'axios';

const ChatsList = ({socket, setSelectedRecipient, user, matched, setMatched}) => {

  const navigation = useNavigation();

  return (
    <View>
      <Text>ChatsList</Text>
      {
        matched.map((item, i)=>(
          <ListItem
            key={i}
            bottomDivider
            onPress = {(event)=>{
              event.preventDefault();
              setSelectedRecipient(item);
              navigation.navigate('ChatPage');
            }}
          >
            <Avatar source={item.sender_id === user ? {uri: item.request_recipient.photos[0].url} : {uri: item.request_sender.photos[0].url}} />
            <ListItem.Content>
              <ListItem.Title>{item.sender_id === user ? item.request_recipient.dog_name : item.request_sender.dog_name }</ListItem.Title>
              <ListItem.Subtitle style={{color: "grey"}}>Start chatting</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      }
    </View>
  )
}

export default ChatsList;