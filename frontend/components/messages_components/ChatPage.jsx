import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar, Keyboard } from 'react-native';
import useKeyboardHeight from 'react-native-use-keyboard-height';
import ChatBody from './ChatBody.jsx';
import ChatInput from './ChatInput.jsx';
import config from '../../config.js';
import axios from 'axios';

const ChatPage = ({socket, selectedRecipient, user}) => {

  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState(selectedRecipient.sender_id);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const scrollViewRef = useRef();
/*   const keyboardHeight = useKeyboardHeight() */
/*   const [keyBoardOffset, setKeyBoardOffset] = useState(0);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const keyboardHeight = useKeyboardHeight();
  console.log('keyboardHeight is ', keyboardHeight) */

  useEffect(() => {
    axios.get(`http://${config.localIP}:${config.port}/messages/${user}`, { params: {participant_id: selectedRecipient.sender_id}})
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

/*   useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const onLayout=(event)=>{
    const {x, y, height, width} = event.nativeEvent.layout;
  } */

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
