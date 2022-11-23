import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Input, Icon, Button } from '@rneui/themed';

const Chat = ({socket}) => {
  const [message, setMessage] = useState({sender_id: 1, recipient_id:2, content:''});
  const [messages, setMessages] = useState([]);

  socket.on('response', (arg)=>{
    setMessages([...messages, arg])
  })

  const displayMessages = (messages)=>{
    return (
      messages.map((message)=>(
        <View key={message.content}>
          <Text>{message.content}</Text>
        </View>
      ))
    )
  }

  const sendMessage = (message)=>{
    socket.emit("send", message);
  }

  return (
    <View>
      <Input
        placeholder="Message here"
        leftIcon={{ type: 'font-awesome', name: 'comment' }}
        value={message.content}
        onChangeText={(value) => setMessage({...message, content: value})} />
      <Button
        color="warning"
        onPress={()=>{
          sendMessage(message);
          setMessage({sender_id: 1, recipient_id:2, content:''})
        }}
      >Send</Button>
      {
      displayMessages(messages)
      }
    </View>
  )
}

export default Chat;