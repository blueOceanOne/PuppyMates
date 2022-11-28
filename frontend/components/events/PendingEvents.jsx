import React, { useState, useEffect } from 'react';
import { events, userData } from '../../sampleData/events.js';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Button, Pressable, Alert } from 'react-native';
import { Avatar } from '@rneui/themed';
import CreateEvent from './createEvent.jsx';
import Map from './Map.jsx';
import axios from 'axios';
import { format } from 'date-fns';
import * as Location from 'expo-location';
import config from '../../config.js';
import { useNavigation } from '@react-navigation/native';

const PendingEvents = ({DYNAMICUSERINFO}) => {
  const [pendingEvents, setPendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios.get(`http://${config.localIP}:${config.port}/pendingEvents/${userData[0].id}`)
  //     .then(async (results) => {
  //       const rawEvents = results.data;
  //       await addressify(rawEvents);
  //       console.log('addressable: ', rawEvents);
  //       await setPendingEvents(rawEvents);
  //       await setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //   }, [])

  // const addressify = async (input) => {
  //   if (input.length > 0) {
  //     await input.forEach(async (element) => {
  //       const coordinates = {latitude: element.event.latitude, longitude: element.event.longitude}
  //       await Location.reverseGeocodeAsync(coordinates)
  //         .then((addressObj) => {
  //           element.event.address =
  //           `${addressObj[0].streetNumber ? `${addressObj[0].streetNumber} ` : ''}${addressObj[0].street}, ${addressObj[0].city} ${addressObj[0].region} ${addressObj[0].postalCode}`;
  //           console.log('within geocoding: ', element);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         })
  //     })
  //   }
  // }

  useEffect(() => {
    axios.get(`http://${config.localIP}:${config.port}/pendingEvents/${userData[0].id}`)
      .then((results) => {
        console.log(results.data);
        const rawEvents = results.data;
        Promise.all(addressify(rawEvents))
          .then((addresses) => {
            addresses.forEach((address, i) => {
              rawEvents[i].event.address =
                `${address[0].streetNumber ? `${address[0].streetNumber} ` : ''}${address[0].street}, ${address[0].city}`;
              })
            setPendingEvents(rawEvents);
            setLoading(false);
            })
            .catch((err) => {
              console.log(err);
            })
      })
      .catch((err) => {
        console.log(err);
      })
    }, [])

  const addressify = (input) => {
    if (input.length > 0) {
      return input.map((element) => {
        const coordinates = {latitude: element.event.latitude, longitude: element.event.longitude}
        return Location.reverseGeocodeAsync(coordinates);
      })
    }
  }


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

  if (loading) {
    return (<></>)
  }

  return (
    <View style={styles.container}>
      {pendingEvents.map((each) => {
        const unformattedDate = new Date(each.event.date);
        const niceDate = format(unformattedDate, 'MM/dd/yy');
        const niceTime = format(unformattedDate, 'h:mmaa');

        return (
          <View style={styles.singleEvent} key={each.event.id}>
            <View style={styles.heading}>
              <Text style={styles.name}>{each.event.title}</Text>
                <Text style={styles.host}>{each.user.dog_name}</Text>
            </View>


            <View style={styles.eventLine2}>
              <View style={styles.specifics}>
                <Text style={styles.address}>{each.event.address}</Text>
                <Text style={styles.datetime}>{`${niceTime}, ${niceDate}`}</Text>
              </View>
              <Avatar rounded source={{uri: each.user.photos[0].url}} />
            </View>
              <Text style={styles.description}>{each.event.description}</Text>
              <View style={styles.buttons}>
                <Button title="Accept" onPress={() => {handleAccept(each.event_id)}}/>
                <Button color="#FF0000" title="Reject" onPress={() => {handleReject(each.event_id)}}/>
              </View>
          </View>
        )
      })}
    </View>
  )
}

export default PendingEvents;

const gap = 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  host: {
    fontStyle: 'italic',
    // paddingRight: 4,
    // paddingTop: 4
  },
  specifics:{
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: (gap / -2),
    paddingBottom: 16,
    paddingTop: 3
  },
  datetime: {
    fontSize: 14,
    marginHorizontal: gap / 2,
  },
  description: {
    fontSize: 16,
  },
  singleEvent: {
    backgroundColor: '#F5EFE6',
    margin: 6,
    padding: 20,
    borderRadius: 25,
  },
  buttons: {
    paddingTop: 13,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  eventLine2: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
