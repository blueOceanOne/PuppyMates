import React, {useRef, useState, useEffect, Form} from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, Pressable, Alert, Image } from 'react-native';
import { Avatar, Icon, Button } from '@rneui/themed';
import userData from '../home/exampleData/userData.js'
import axios from 'axios';
import config from '../../config.js';
import * as eventsSampleData from '../../sampleData/events.js';
import { Input } from '@rneui/themed';
import Guests from './Guests.jsx';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, route } from '@react-navigation/native';
import * as Location from 'expo-location';


const CreateEvent = ({invitees, matches}) => {
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
    console.log(invitees);
    for (var i = 0; i < matches.length; i++) {
      if (matches[i].recipient_id === each) {
        return matches[i];
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
        navigation.navigate('Event Home');
        setEvent({
          host_id: hostData[0].id,
          description: null,
          title: null,
          date: (new Date()),
          latitude: null,
          longitude: null,
          invitees: null
        });
      })
  }

  return (
    <ScrollView>
      <View style={styles.eventContainer}>
        <Text style={styles.title}>Event Title</Text>
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
        <Button type='solid' color='white' radius='md' onPress={() => {navigation.navigate('Guests')}}>
          <View style={styles.inviteButton2}>
            <Text style={[styles.createText, {color: 'black'}]}>Invite Guests</Text>
            <Icon
              name={"chevron-right"}
              type='material-community'
              alignSelf='flex-end'
            />
          </View>
        </Button>
        { guestlist.length > 0 ? (
          <View style={styles.guestlist}>
            {
            (guestlist.map((each) => {
              return (
                <View
                  key={each.id}
                  style={styles.individualGuest}
                >
                  <Avatar rounded source={{uri: each.request_recipient.photos[0].url}} />
                  <Text style={styles.guestInfo}>
                    {each.request_recipient.dog_name}
                  </Text>
                </View>
              )
            }))
          }
          </View>
        ) : null }
        <View style={styles.buttonLine}>
          <Pressable style={styles.createButton} onPress={handleCreate}>
            <Text style={styles.createText}>Create</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}

export default CreateEvent;

const regularFont = 16;

const styles = StyleSheet.create({
  eventContainer: {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    marginLeft: 6,
    marginRight: 6,
  },
  title: {
    paddingTop: 10,
    fontSize: regularFont,
  },
  buttonLine: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
  },
  createText: {
    color: 'white',
    fontSize: regularFont
  },
  createButton: {
    backgroundColor: '#007AFF',
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  inviteButton: {
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 7,
  },
  inviteButton2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  invite: {
    fontSize: regularFont,
    backgroundColor: 'white',
    margin: 6,
    padding: 5,
  },
  guestlist: {
    borderRadius: 10,
    backgroundColor: 'white',
    paddingBottom: 15,
    marginTop: 15
  },
  individualGuest: {
    marginTop: 15,
    marginHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
  },
  guestInfo: {
    paddingLeft: 15,
    paddingTop: 8,
    fontSize: regularFont
  },
  formText: {
    fontSize: regularFont,
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