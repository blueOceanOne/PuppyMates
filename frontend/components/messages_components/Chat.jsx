import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Input, Icon, Button } from '@rneui/themed';

const Chat = ({socket}) => {
  const [message, setMessage] = useState({sender_id: 1, recipient_id:2, content:''});

  const sendMessage = (message)=>{
    socket.emit("send", message.content)
  }

  return (
    <View>
      <Input
        placeholder="Message here"
        leftIcon={{ type: 'font-awesome', name: 'comment' }}
        onChangeText={(value) => setMessage({...message, content: value})} />
      <Button
        color="warning"
        onPress={()=>{
          sendMessage(message);
        }}
      >Send</Button>
    </View>
  )
}

export default Chat;