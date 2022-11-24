import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Icon, Button } from '@rneui/themed';


const ChatInput = ({socket, user, recipient})=>{
  const [message, setMessage] = useState({sender_id: '', recipient_id: '', content:''})
  console.log('recipient is ', recipient);

  return (
    <View>
        <Text>To recipient {recipient}</Text>
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
            socket.emit("send", {...message, sender_id: user})
            setMessage({sender_id: user, recipient_id:2, content:''})
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