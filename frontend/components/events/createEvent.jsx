import React, {useRef, useState, Form} from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, Button, Pressable } from 'react-native';
import { userData } from '../../sampleData/events.js';
import { Input } from '@rneui/themed';
import Guests from './Guests.jsx';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateEvent = ({setCreate, DYNAMICUSERINFO}) => {
  const sampleData = userData;

  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState({
    host: sampleData.id,
    description: null,
    title: null,
    date: (new Date()),
    address: null,
    invitees: []
  })

  const handleChange = (input, property) => {
    event[property] = input;
    setEvent({...event});
  }

  return (
    <ScrollView>
      <View style={styles.eventContainer}>
        <Text style={styles.formText}>Event Title</Text>
        <Input value={event.title} onChange={(e) => {handleChange(e.nativeEvent.text, 'title')}}/>
        <Text style={styles.formText}>Event Location</Text>
        <Input value={event.address} onChange={(e) => {handleChange(e.nativeEvent.text, 'address')}}/>
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
        <Pressable onPress={() => {setOpen(!open)}}>
          <Text style={styles.invite}>Invite Guests</Text>
        </Pressable>
        <Button title='Cancel' onPress={() => {setCreate(false)}}/>
        { open ? <Guests setOpen={setOpen} /> : null }
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