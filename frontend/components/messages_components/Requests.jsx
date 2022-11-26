import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import RequestDetail from './RequestDetail.jsx';
import config from '../../config.js';
import axios from 'axios';
// import pendingData from './requestsData.js';

const Requests = ({selectedRequest, setSelectedRequest, user}) => {
  const [pendingData, setPendingData] = useState([]);
  useEffect (()=>{
    axios.get(`http://${config.localIP}:${config.port}/requests/pending/${user}`)
    .then((response)=>{
      setPendingData(response.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  }, []);

  const navigation = useNavigation();

  return (
    <View>
      <Text>Pending requests</Text>
      {
        pendingData.map((item, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress = {(event) => {
              event.preventDefault();
              setSelectedRequest(item.sender_id);
              navigation.navigate('RequestDetail');
            }}
          >
            <Avatar source={{uri: item.request_sender.photos[0].url}} />
            <ListItem.Content>
              <ListItem.Title>{item.request_sender.dog_name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))
      }
    </View>
  )
}

export default Requests;