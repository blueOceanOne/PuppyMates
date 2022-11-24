import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import ChatBody from './ChatBody.jsx';
import ChatInput from './ChatInput.jsx';

const ChatPage = ({socket, selectedRecipient}) => {

  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(102);
  const [recipient, setRecipient] = useState(selectedRecipient)

  useEffect(()=>{
    socket.emit('requestID', user);
    socket.on('sendID', (newUser)=>{
      console.log('socketid is ', newUser);
      setUser(newUser.id);
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

  console.log('selected Recipent is ', selectedRecipient)

  return (
    <View>
      <ChatBody messages={messages} user={user} recipient={recipient}/>
      <ChatInput socket={socket} user={user} recipient={recipient}/>
    </View>
  )
}

export default ChatPage;
