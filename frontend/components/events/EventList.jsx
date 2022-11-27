import React, {useState} from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar, Text } from 'react-native';
import * as Location from 'expo-location';

const EventList = ({eventList}) => {
  console.log('event list within eventlist.jsx: ', eventList);

  if (eventList.length === 0) {
    return (
      <>
      </>
    )
  }

  return (
    <View style={styles.container}>
      {eventList.map((each) => {
        const [address, setAddress] = useState('');
        const coords = {latitude: each.event.latitude, longitude: each.event.longitude};
        Location.reverseGeocodeAsync(coords)
          .then((geocodedAddress) => {
            console.log(geocodedAddress);
            setAddress(
              `${geocodedAddress[0].streetNumber ? `${geocodedAddress[0].streetNumber} ` : ''}${geocodedAddress[0].street} ${geocodedAddress[0].city}, ${geocodedAddress[0].region} ${geocodedAddress[0].postalCode}`
            )
          })
          .catch((err) => {
            console.log('reverse geocoding broken: ', err);
          });

        return (
          <View style={styles.singleEvent} key={each.event.event_id}>
            <Text style={styles.name}>{each.event.title}</Text>
            <Text style={styles.host}>HostID: {each.event.host_id}</Text>
            <Text style={styles.location}>{address}</Text>
            <Text style={styles.description}>{each.event.description}</Text>
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
  name: {
    fontSize: 20
  },
  singleEvent: {
    backgroundColor: '#F5EFE6',
    margin: 6,
    padding: 20,
    borderRadius: 25,
  },
});
