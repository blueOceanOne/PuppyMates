import React, {useRef, useState, Form} from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, Button } from 'react-native';
import { userData } from '../../sampleData/events.js';
import { Input } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateEvent = ({DYNAMICUSERINFO}) => {
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

  return (
    <ScrollView>
      <View style={styles.eventContainer}>
        <Text style={styles.formText}>Event Title</Text>
        <Input value={event.title}/>
        <Text style={styles.formText}>Event Location</Text>
        <Input value={event.address}/>
        <Text style={styles.formText}>Event Time & Place</Text>
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
      </View>
    </ScrollView>
  )
}

export default CreateEvent;

const styles = StyleSheet.create({
  eventContainer: {
    paddingLeft: 6,
    paddingRight: 6,
    marginLeft: 6,
    marginRight: 6
  },
  formText: {
    fontSize: 18,
  },
  date: {
    flex: 1,
    align: 'center',
    justify: 'center',
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom:10,
  },
})