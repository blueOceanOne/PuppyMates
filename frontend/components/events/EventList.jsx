import React, {useState} from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar, Text } from 'react-native';
import { Avatar } from '@rneui/themed';
import * as Location from 'expo-location';
import { format } from 'date-fns';

const EventList = ({eventList}) => {
  if (eventList.length === 0) {
    return (
      <>
      </>
    )
  }

  return (
    <View style={styles.container}>
      {eventList.map((each) => {
        const unformattedDate = new Date(each.event.date);
        const niceDate = format(unformattedDate, 'MM/dd/yy');
        const niceTime = format(unformattedDate, 'h:mmaa');
        const [address, setAddress] = useState('');
        const coords = {latitude: each.event.latitude, longitude: each.event.longitude};
        Location.reverseGeocodeAsync(coords)
          .then((geocodedAddress) => {
            setAddress(
              `${geocodedAddress[0].streetNumber ? `${geocodedAddress[0].streetNumber} ` : ''}${geocodedAddress[0].street} ${geocodedAddress[0].city}`
            )
          })
          .catch((err) => {
            console.log('reverse geocoding broken: ', err);
          });

        return (
          <View style={styles.singleEvent} key={each.event.id}>
            <View style={styles.heading}>
              <Text style={styles.name}>{each.event.title}</Text>
              <Text style={styles.host}>{each.event.user.dog_name}</Text>
            </View>
            <View style={[styles.specifics, {justifyContent: 'space-between'}]}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.address}>{address}</Text>
                <Text style={styles.datetime}>{`${niceTime}, ${niceDate}`}</Text>
              </View>
              <Avatar rounded source={{uri: each.event.user.photos[0].url}} />
            </View>
            <Text style={styles.description}>{each.event.description}</Text>
          </View>
        )
      })}
    </View>
  )
}

export default EventList;

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
  }
});
