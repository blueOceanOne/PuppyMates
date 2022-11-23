import React, {useState} from 'react';
import { View, Text } from 'react-native';
import Requests from './Requests.jsx';
import ChatsList from './ChatsList.jsx';
import { Button } from '@rneui/themed';

const MessagePage = ({socket}) => {
  return (
    <View>
      <Requests />
      <ChatsList socket={socket}/>
    </View>
  )
}

export default MessagePage;