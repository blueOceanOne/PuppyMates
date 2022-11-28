import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Details from './Details.jsx'
import config from '../../config.js';
import axios from 'axios';

const RequestDetail = ({selectedRequest, user, setMatched, setPending}) => {
  const [selectedUser, setSelectedUser] = useState('empty');
  useEffect (()=>{
    axios.get(`http://${config.localIP}:${config.port}/users/${selectedRequest}`)
    .then((response)=>{
      setSelectedUser(response.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  }, []);

  const navigation = useNavigation();

  const handleAcceptorReject = (action) => {
    axios.put(`http://${config.localIP}:${config.port}/requests/${action}/${user}`, null, { params: { participant_id: selectedRequest}})
    .then(()=>{
      console.log('accepted');
      let promise1 = axios.get(`http://${config.localIP}:${config.port}/requests/matched/${user}`);
      let promise2 = axios.get(`http://${config.localIP}:${config.port}/requests/pending/${user}`)
      Promise.all([promise1, promise2])
        .then((values) => {
          setMatched(values[0].data);
          setPending(values[1].data);
          navigation.navigate('MessagePage');
        })
        .catch((err)=>{
          console.log(err);
        })
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  if (selectedUser!=='empty') {
    return (
      <View>
        <Details selectedUser={selectedUser}/>
        <Button
          title="Accept"
          onPress = {(event)=>{
            event.preventDefault();
            handleAcceptorReject('accept');
          }}
          >Accept</Button>
        <Button
          title="Reject"
          onPress={(event)=>{
            event.preventDefault();
            handleAcceptorReject('reject');
          }}
          >Reject</Button>
      </View>
    )
  }
}

export default RequestDetail;