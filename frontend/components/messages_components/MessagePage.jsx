import React, {useState} from 'react';
import { View, Text } from 'react-native';
import Chat from './Chat.jsx';

const MessagePage = ({socket}) => {

  return (
    <View>
      <Chat socket={socket}/>
    </View>
  )
}

export default MessagePage;