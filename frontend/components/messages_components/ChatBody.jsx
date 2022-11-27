import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';


const ChatBody = ({messages, user}) => {

  const renderMessages = (messages)=>{
    return messages.map((message, i)=>{
      if (message.sender_id === user) {
        return (
          <View style={styles.wrapper}>
            <View style={styles.sender} key={i}>
              <Text style={styles.content} >{message.content}</Text>
            </View>
          </View>
        )
      } else {
        return (
          <View style={styles.recipient} key={i}>
            <Text style={styles.content}>{message.content}</Text>
          </View>
        )
      }
    }
    )
  }

  return (
    <View style={styles.container}>
      {renderMessages(messages)}
    </View>
  )
}

export default ChatBody;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  sender: {
    backgroundColor: '#FFE9B1',
    padding: 8,
    margin: 8,
    borderRadius: 15,
    maxWidth: '70%',
  },

  recipient: {
    backgroundColor: '#D9D9D9',
    padding: 8,
    margin: 8,
    borderRadius: 15,
    maxWidth: '70%'
  },

  content: {
    color: 'black',
    fontSize: 16
  }

})