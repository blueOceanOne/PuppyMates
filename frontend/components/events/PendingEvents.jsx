import React, { useState } from 'react';
import { events, userData, pendingEvents } from '../../sampleData/events.js';
import { SafeAreaView, ScrollView, StyleSheet, Avatar, Text, View, Button, Pressable, Alert } from 'react-native';
import CreateEvent from './createEvent.jsx';
import Map from './Map.jsx';

const PendingEvents = ({DYNAMICUSERINFO}) => {
  console.log('PENDING eventList: ',pendingEvents);

  // REQUIRES HTTP REQUEST TO GET DATA
  // const eventList = [];

  // axios.get('/events/pending/whatever')
  //   .then((results) => {
  //     events = results.data
  //   )}
  //   .catch((err) => {
  //     console.log(err);
  //   });

  const handleAccept = (eventId) => {
    console.log(`Event ${eventId} has been accepted`);
    Alert.alert('See you there!');
    // perform axios request
  }

  const handleReject = (eventId) => {
    console.log(`Event ${eventId} has been rejected`);
    Alert.alert(`Event Rejected`);
    // perform axios request
  }

    return (
      <View style={styles.container}>
        {pendingEvents.map((each) => {
          return (
            <View style={styles.singleEvent} key={each.eventId}>
              <Text style={styles.name}>{each.eventTitle}</Text>
              <Text style={styles.host}>{each.hostUsername}</Text>
              <Text style={styles.location}>{each.eventLocation}</Text>
              <Text style={styles.description}>{each.eventDescription}</Text>
              <Button title="Accept" onPress={() => {handleAccept(each.eventId)}}/>
              <Button color="#FF0000" title="Reject" onPress={() => {handleReject(each.eventId)}}/>
            </View>
          )
        })}
      </View>
    )
  }
  export default PendingEvents;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    singleEvent: {
      backgroundColor: '#F5EFE6',
      margin: 6,
      padding: 20,
      borderRadius: 25,
    },
  });
