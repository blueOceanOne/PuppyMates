import React, { useState } from 'react';
import { View, Text } from 'react-native'
import ChatPage from './ChatPage.jsx';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { ListItem, Avatar } from '@rneui/themed';
import matchedData from './matchedData.js';

const ChatsList = ({socket}) => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>ChatsList</Text>
      {
        matchedData.map((item, i)=>(
          <ListItem
            key={i}
            bottomDivider
            onPress = {(event)=>{
              event.preventDefault();
              navigation.navigate('ChatPage')
            }}
          >
            <Avatar source={{uri: item.photo}} />
            <ListItem.Content>
              <ListItem.Title>{item.dog_name}</ListItem.Title>
              <ListItem.Subtitle style={{color: "grey"}}>Start chatting</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      }
    </View>
  )
}

export default ChatsList;