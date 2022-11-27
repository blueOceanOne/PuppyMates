import React, {useState} from 'react';
import { View, Text } from 'react-native';
import Requests from './Requests.jsx';
import ChatsList from './ChatsList.jsx';
import { Button } from '@rneui/themed';

const MessagePage = ({socket, user, selectedRequest, setSelectedRequest, selectedRecipient, setSelectedRecipient, pending, setPending, matched, setMatched}) => {

  return (
    <View>
      <Requests selectedRequest={selectedRequest} setSelectedRequest={setSelectedRequest} user={user} pending={pending} setPending={setPending}/>
      <ChatsList socket={socket} selectedRecipient={selectedRecipient} setSelectedRecipient={setSelectedRecipient} user={user} matched={matched} setMatched={setMatched}/>
    </View>
  )
}

export default MessagePage;