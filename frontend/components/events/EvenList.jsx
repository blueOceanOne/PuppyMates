import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, StatusBar, Text } from 'react-native';

const EventList = ({eventList}) => {
  console.log('event list: ', eventList)

  // const renderItem = ({ item }) => {
  //   console.log(item);
  //   return (
  //     <View style={styles.container}>
  //     <Text style={styles.name}>{item.eventTitle}</Text>
  //     <Text style={styles.host}>{item.hostUsername}</Text>
  //     <Text style={styles.location}>{item.eventLocation}</Text>
  //     <Text style={styles.description}>{item.eventDescription}</Text>
  //     </View>
  //   )
  // }


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
    // <>
    //   <FlatList
    //     data={eventList}
    //     renderItem = {renderItem}
    //     keyExtractor={item => item.eventId}
    //   />
    // </>
  )
}
export default EventList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  singleEvent: {
    backgroundColor: '#F5EFE6',
    margin: 6,
    padding: 20,
    borderRadius: 25,
  },
  name: {
    // padding: 20,
    // fontSize: 20,
    // marginTop: 5,
  },
  item: {
    // padding: 20,
    // fontSize: 15,
    // marginTop: 5,
  },
  eventDate: {
    // fontSize: 20,
    // padding: 12,
  },
  eventLocation: {
    // fontSize: 10,
  },
});

// {eventList.eventTitle}
// {eventList.hostUsername}
// {eventList.eventDescription}
// {eventList.eventLocation}