import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Icon, Button } from '@rneui/themed';
import config from '../../config.js';
import axios from 'axios';


const ChatInput = ({socket, user, recipient})=>{
  const [message, setMessage] = useState({sender_id: user, recipient_id: recipient, content:''})

  const sendMessage = (value) => {
    axios.post(`http://${config.localIP}:${config.port}/messages`, value)
      .then(() => {
        console.log('message sent')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <View>
        <Text>To recipient {recipient}</Text>
        <Text>I am {user}</Text>
        <Input
            placeholder="Message here"
            leftIcon={{ type: 'font-awesome', name: 'comment' }}
            value={message.content}
            onChangeText={(value) => setMessage({...message, content: value})} />
        <Button
          color="warning"
          onPress={(event)=>{
            event.preventDefault();
            console.log(message);
            socket.emit("send", message);
            sendMessage(message);
            setMessage({sender_id: user, recipient_id: recipient, content:''})
          }}
        >Send to</Button>
    </View>
  )
}

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});