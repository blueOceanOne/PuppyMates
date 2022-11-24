import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import ChatBody from './ChatBody.jsx';
import ChatInput from './ChatInput.jsx';

const ChatPage = ({socket}) => {

  const [messages, setMessages]=useState([]);
  const [user, setUser]=useState({id: 102, socket_id: ''});

  useEffect(()=>{
    socket.emit('requestID', user.id);
    socket.on('sendID', (newUser)=>{
      console.log('socketid is ', newUser);
      setUser(newUser);
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
