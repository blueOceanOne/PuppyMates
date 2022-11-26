import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import config from '../../config.js';
import axios from 'axios';

const RequestDetail = ({selectedRequest, user}) => {
  const [selectedUser, setSelectedUser] = useState('empty');
  useEffect (()=>{
    axios.get(`http://${config.localIP}:${config.port}/users`, {
      params: {user_id: selectedRequest}
    })
    .then((response)=>{
      setSelectedUser(response.data[0])
    })
    .catch((err)=>{
      console.log(err);
    })
  }, []);

  const handleAccept = () => {
    console.log('user is ', user);
    console.log('selectedRequest is ', selectedRequest)
    axios.put(`http://${config.localIP}:${config.port}/requests/accept/${user}`, null, { params: { participant_id: selectedRequest}})
    .then(()=>{
      console.log('accepted')
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  if (selectedUser!=='empty') {
    return (
      <View>
        <Text>Dog Detail page of {selectedUser.dog_name}</Text>
        <Button
          title="Accept"
          onPress = {(event)=>{
            event.preventDefault();
            handleAccept();
          }}
          >Accept</Button>
        <Button
          title="Reject"
          onPress={(event)=>{
            event.preventDefault();
/*             handleReject() */}}
          >Reject</Button>
      </View>
    )
  }
}

export default RequestDetail;