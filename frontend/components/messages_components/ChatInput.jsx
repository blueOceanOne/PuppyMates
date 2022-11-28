import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Input, Icon} from '@rneui/themed';
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
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Message here"
            leftIcon={{ type: 'font-awesome', name: 'comment' }}
            value={message.content}
            onChangeText={(value) => setMessage({...message, content: value})} />
        <TouchableOpacity
          style={styles.button}
          title="Send"
          onPress={(event)=>{
            event.preventDefault();
            console.log(message);
            socket.emit("send", message);
            sendMessage(message);
            setMessage({sender_id: user, recipient_id: recipient, content:''})
          }}
        >
          <Text style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>Send</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    flext: 2,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  input:{
    width: '69%',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    fontSize: 16
  },
  button: {
    width: '29%',
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F49D1A',
    alignItems:'center',
    justifyContent: 'center',
    fontSize: 16
  }
});