import React from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar, Text } from 'react-native';

const EventList = ({eventList}) => {
  console.log('event list within eventlist.jsx: ', eventList);
  return (
    <View style={styles.container}>
      {eventList.map((each) => {
        return (
          <View style={styles.singleEvent} key={each.eventId}>
            <Text style={styles.name}>{each.eventTitle}</Text>
            <Text style={styles.host}>{each.hostUsername}</Text>
            <Text style={styles.location}>{each.eventLocation}</Text>
            <Text style={styles.description}>{each.eventDescription}</Text>
          </View>
        )
      })}
    </View>
  )
}
export default EventList;

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
