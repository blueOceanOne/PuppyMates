import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ChatBody from './ChatBody.jsx';
import ChatInput from './ChatInput.jsx';
import config from '../../config.js';
import axios from 'axios';

const ChatPage = ({socket, selectedRecipient, user}) => {

  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState(selectedRecipient.sender_id)
  useEffect(() => {
    axios.get(`http://${config.localIP}:${config.port}/messages/${user}`, { params: {participant_id: selectedRecipient.sender_id}})
      .then((response)=>{
        setMessages(response.data);
      })
      .catch((err)=>{
        console.log(err);
      })
  }, [])

  useEffect(() => {
    socket.on('response', (data) => {
      setMessages([...messages, data])
    });
    return ()=>{
      socket.off('response');
    }
  }, [socket, messages]);

  return (
    <View style={style.container}>
      <ChatInput socket={socket} user={user} recipient={recipient}/>
      <ChatBody messages={messages} user={user} recipient={recipient}/>
    </View>
  )
}
const style = StyleSheet.create({
  container: {
    flex:2,
    backgroundColor: 'white'
  }
})


export default ChatPage;
