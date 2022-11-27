import React, { useState } from 'react';
import { View, Text } from 'react-native';


const ChatBody = ({messages, user}) => {

  const renderMessages = (messages)=>{
    return messages.map((message, i)=>{
      if (message.sender_id === user) {
        return (
          <View key={i}>
            <Text style={{color: 'orange'}} >{message.content}</Text>
          </View>
        )
      } else {
        return (
          <View key={message.content}>
            <Text>{message.content}</Text>
          </View>
        )
      }
    }
    )
  }

  return (
    <View>
      {renderMessages(messages)}
    </View>
  )
}

export default ChatBody;