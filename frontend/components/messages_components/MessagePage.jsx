import React, {useState} from 'react';
import { View, Text } from 'react-native';
import Requests from './Requests.jsx';
import ChatsList from './ChatsList.jsx';
import { Button } from '@rneui/themed';

const MessagePage = ({socket, selectedRequest, setSelectedRequest, selectedRecipient, setSelectedRecipient}) => {
  return (
    <View>
      <Requests selectedRequest={selectedRequest} setSelectedRequest={setSelectedRequest}/>
      <ChatsList socket={socket} selectedRecipient={selectedRecipient} setSelectedRecipient={setSelectedRecipient}/>
    </View>
  )
}

export default MessagePage;