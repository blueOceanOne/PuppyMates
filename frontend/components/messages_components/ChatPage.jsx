import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import ChatBody from './ChatBody.jsx';
import ChatInput from './ChatInput.jsx';

const ChatPage = ({socket}) => {

  const [messages, setMessages]=useState([]);
  const [user, setUser]=useState('');

  useEffect(()=>{
    socket.emit('requestID', null);
    socket.on('sendID', (arg)=>{
      setUser(arg);
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
    <View>
      <ChatBody messages={messages} user={user}/>
      <ChatInput socket={socket} user={user}/>
    </View>
  )
}

export default ChatPage;
