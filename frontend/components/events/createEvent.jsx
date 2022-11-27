import React, {useRef, useState, useEffect, Form} from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, Button, Pressable, Alert } from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';
import userData from '../home/exampleData/userData.js'
import axios from 'axios';
import config from '../../config.js';
import * as eventsSampleData from '../../sampleData/events.js';
import { Input } from '@rneui/themed';
import Guests from './Guests.jsx';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, route } from '@react-navigation/native';
import * as Location from 'expo-location';


const CreateEvent = ({invitees, DYNAMICUSERINFO}) => {
  const navigation = useNavigation();
  const sampleData = userData;
  const hostData = eventsSampleData.userData;

  const [event, setEvent] = useState({
    host_id: hostData[0].id,
    description: null,
    title: null,
    date: (new Date()),
    latitude: null,
    longitude: null,
    invitees: null
  })

  useEffect(() => {
    event.invitees = invitees;
    setEvent({...event});
  }, [invitees]);

  const handleChange = (input, property) => {
    event[property] = input;
    setEvent({...event});
  }

  const guestlist = invitees.map((each) => {
    for (var i = 0; i < userData.length; i++) {
      if (userData[i].id === each) {
        return userData[i];
      }
    }
  })

  const coordinatify = async () => {
    try {
      const coordinates = await Location.geocodeAsync(event.address);
      const eventCopy = {...event};
      eventCopy.longitude = coordinates[0].longitude;
      eventCopy.latitude = coordinates[0].latitude;
      await setEvent(eventCopy);
      return eventCopy;
    }
    catch (err) {
      Alert.alert('Invalid address');
      return err;
    }
  }

  const send = (input) => {
    const anyNullValues = Object.values(input).reduce((memo, currElement) => {
      if (memo === true) {
        return true;
      }
      return memo = (!currElement);
    }, false
    )
    if (!anyNullValues) {
      axios.post(`http://${config.localIP}:${config.port}/attendingEvents`, input)
      .then(() => {
        Alert.alert('Successfully created event');
      })
      .catch((err) => {
        Alert.alert('We had a little oopsie daisy bingo boingo :( Could not create event');
      })
    } else {
      Alert.alert('The event details are incomplete');
    }
  }

  const handleCreate = () => {
    coordinatify()
      .then((results) => {
        send(results);
      })
  }

  return (
    <ScrollView>
      <View style={styles.eventContainer}>
        <Text style={styles.formText}>Event Title</Text>
        <Input value={event.title} onChange={(e) => {handleChange(e.nativeEvent.text, 'title')}}/>
        <Text style={styles.formText}>Event Location</Text>
        <Input value={event.address} onChange={(e) => {handleChange(e.nativeEvent.text, 'address')}}/>
        <Text style={styles.formText}>Event Description</Text>
        <Input value={event.description} onChange={(e) => {handleChange(e.nativeEvent.text, 'description')}}/>
        <Text style={styles.formText}>Event Time & Date</Text>
        <View style={styles.date}>
          <DateTimePicker
            style={styles.date}
            value={event.date}
            mode={'datetime'}
            onChange={(value, selectedDate) => {
              event.date = selectedDate;
              setEvent({...event});
            }}
          />
        </View>
        <Pressable onPress={() => {navigation.navigate('Guests')}}>
          <Text color='#2D70F9' style={styles.invite}>Invite Guests</Text>
        </Pressable>
        { guestlist ?
          (guestlist.map((each) => {
            return (
              <ListItem
                key={each.id}
              >
                <Avatar source={{uri: each.photos[0]}} />
                <ListItem.Title>
                  {each['dog_name']}
                </ListItem.Title>
                <Text>
                  {each.username}
                </Text>
              </ListItem>
            )
          }))
        : null }
        <Button title='Create' onPress={handleCreate}/>
      </View>
    </ScrollView>
  )
}

export default CreateEvent;

const styles = StyleSheet.create({
  eventContainer: {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    marginLeft: 6,
    marginRight: 6,
  },
  invite: {
    fontSize: 20,
    align: 'center',
    justify: 'center',
    backgroundColor: 'white',
    margin: 6,
    padding: 5,
  },
  formText: {
    fontSize: 18,
  },
  date: {
    flex: 1,
    align: 'center',
    justify: 'center',
    paddingRight: 7,
    paddingTop: 10,
    paddingBottom:10,
  },
})