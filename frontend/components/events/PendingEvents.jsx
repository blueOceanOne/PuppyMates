import React, { useState, useEffect } from 'react';
import { events, userData } from '../../sampleData/events.js';
import { SafeAreaView, ScrollView, StyleSheet, Avatar, Text, View, Button, Pressable, Alert } from 'react-native';
import CreateEvent from './createEvent.jsx';
import Map from './Map.jsx';
import axios from 'axios';
import { format } from 'date-fns';
import * as Location from 'expo-location';
import config from '../../config.js';
import { useNavigation } from '@react-navigation/native';

const PendingEvents = ({DYNAMICUSERINFO}) => {
  const [pendingEvents, setPendingEvents] = useState([]);

  // There is something wrong with the way that address is being interpolated via reverse geo-coding
  // Need to look into it later
  useEffect(() => {
    axios.get(`http://${config.localIP}:${config.port}/pendingEvents/${userData[0].id}`)
      .then(async (results) => {
        const rawEvents = results.data;
        await rawEvents.forEach(async (element) => {
          const coordinates = {latitude: element.event.latitude, longitude: element.event.longitude}
          await Location.reverseGeocodeAsync(coordinates)
            .then((addressObj) => {
              element.event.address =
              `${addressObj[0].streetNumber ? `${addressObj[0].streetNumber} ` : ''}${addressObj[0].street}, ${addressObj[0].city} ${addressObj[0].region} ${addressObj[0].postalCode}`
            })
            .catch((err) => {
              console.log(err);
            })
        })
        await setPendingEvents(rawEvents);
        console.log(pendingEvents);
      })
      .catch((err) => {
        console.log(err);
      })
    }, [])

  const cleanup = (targetId) => {
    for (var i = 0; i < pendingEvents.length; i++) {
      if (pendingEvents[i].event.event_id === targetId) {
        const pendingCopy = [...pendingEvents];
        pendingCopy.splice(i, 1);
        setPendingEvents([...pendingCopy]);
        return;
      }
    }
  }

  const handleAccept = (eventId) => {
    Alert.alert('See you there!');
    axios.put(`http://${config.localIP}:${config.port}/pendingEvents/confirm/${sampleUserData[0].id}?event_id=${eventId}`)
      .then(() => {
        cleanup(eventId);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleReject = (eventId) => {
    Alert.alert(`Event Rejected`);
    axios.put(`http://${config.localIP}:${config.port}/pendingEvents/reject/${sampleUserData[0].id}?event_id=${eventId}`)
      .then(() => {
        cleanup(eventId);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // if (loading) {
  //   return (<></>)
  // }

  return (
    <View style={styles.container}>
      {pendingEvents.map((each) => {
        console.log('each element while rendering: ', each);
        const unformattedDate = new Date(each.event.createdAt);
        const niceDate = format(unformattedDate, 'MMM do, yy');
        const niceTime = format(unformattedDate, 'h:mmaa');
        console.log(niceDate, niceTime);

        return (
          <View style={styles.singleEvent} key={each.event.id}>
            <Text style={styles.name}>{each.event.title}</Text>
            <Text style={styles.host}>{each.event.host_id}</Text>
            <Text style={styles.address}>{each.event.address}</Text>
            <Text style={styles.datetime}>{niceDate}</Text>
            <Text style={styles.datetime}>{niceTime}</Text>
            <Text style={styles.description}>{each.event.description}</Text>
            <Button title="Accept" onPress={() => {handleAccept(each.event_id)}}/>
            <Button color="#FF0000" title="Reject" onPress={() => {handleReject(each.event_id)}}/>
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
