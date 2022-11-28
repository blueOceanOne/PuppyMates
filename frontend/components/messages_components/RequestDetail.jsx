import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView, ScrollView,TouchableOpacity } from 'react-native';
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
      <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
        <ScrollView>
          <Details selectedUser={selectedUser}/>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style = {styles.accept}
              title="Accept"
              onPress = {(event)=>{
                event.preventDefault();
                handleAcceptorReject('accept');
              }}
              >
                <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>Accept</Text>
              </TouchableOpacity>
            <TouchableOpacity
              style={styles.reject}
              title="Reject"
              onPress={(event)=>{
                event.preventDefault();
                handleAcceptorReject('reject');
              }}
              >
                <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>Reject</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default RequestDetail;

const styles = StyleSheet.create({
  accept: {
    width: 140,
    height: 40,
    backgroundColor: '#B6E2A1',
    margin: 10,
    borderRadius: 10,
    alignItems:'center',
    justifyContent: 'center',
  },

  reject: {
    width: 140,
    height: 40,
    backgroundColor: '#EC7272',
    margin: 10,
    borderRadius: 10,
    alignItems:'center',
    justifyContent: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
})