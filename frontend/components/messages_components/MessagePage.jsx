import React, {useState} from 'react';
import { View, Text } from 'react-native';
import ChatPage from './ChatPage.jsx';

const MessagePage = ({socket}) => {

  return (
    <View>
      <ChatPage socket={socket}/>
    </View>
  )
}

export default MessagePage;