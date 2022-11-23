import React, { useState } from 'react';
import { View, Text } from 'react-native';


const ChatBody = ({messages, user}) => {

  const renderMessages = (messages)=>{
    return messages.map((message)=>{
      if (message.sender_id === user) {
        return (
          <View key={message.content}>
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