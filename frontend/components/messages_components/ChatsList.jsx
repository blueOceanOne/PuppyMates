import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'
import ChatPage from './ChatPage.jsx';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { ListItem, Avatar } from '@rneui/themed';
import config from '../../config.js';
import axios from 'axios';

const ChatsList = ({socket, setSelectedRecipient, user}) => {
  const [matchedData, setMatchedData] = useState([]);
  useEffect (()=>{
    axios.get(`http://${config.localIP}:${config.port}/requests/accepted/${user}`)
    .then((response)=>{
      setMatchedData(response.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])

  const navigation = useNavigation();

  return (
    <View>
      <Text>ChatsList</Text>
      {
        matchedData.map((item, i)=>(
          <ListItem
            key={i}
            bottomDivider
            onPress = {(event)=>{
              event.preventDefault();
              setSelectedRecipient(item.sender_id);
              navigation.navigate('ChatPage');
            }}
          >
            <Avatar source={{uri: item.request_sender.photos[0].url}} />
            <ListItem.Content>
              <ListItem.Title>{item.request_sender.dog_name}</ListItem.Title>
              <ListItem.Subtitle style={{color: "grey"}}>Start chatting</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      }
    </View>
  )
}

export default ChatsList;