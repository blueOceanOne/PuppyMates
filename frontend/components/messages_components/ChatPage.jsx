import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar, Keyboard } from 'react-native';
import useKeyboardHeight from 'react-native-use-keyboard-height';
import ChatBody from './ChatBody.jsx';
import ChatInput from './ChatInput.jsx';
import config from '../../config.js';
import axios from 'axios';

const ChatPage = ({socket, chatRecipient, user}) => {

  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState(chatRecipient);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const scrollViewRef = useRef();

  useEffect(() => {
    axios.get(`http://${config.localIP}:${config.port}/messages/${user}`, { params: {participant_id: chatRecipient}})
      .then((response)=>{
        setMessages(response.data);
      })
      .catch((err)=>{
        console.log(err);
      })
  }, []);

  useEffect(() => {
    socket.on('response', (data) => {
      setMessages([...messages, data])
    });
    return ()=>{
      socket.off('response');
    }
  }, [socket, messages]);

  return (
    <SafeAreaView style={styles.container}>
      <ChatInput style={styles.input}socket={socket} user={user} recipient={recipient}/>
      <View style={{height: 350}}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          <ChatBody messages={messages} user={user} recipient={recipient}/>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white'
  },
  input: {
    position: 'absolute',
  }
})


export default ChatPage;
