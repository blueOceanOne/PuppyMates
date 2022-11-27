import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { events, userData } from '../sampleData/events.js';
import EventList from '../components/events/EventList.jsx';
import CreateEvent from './events/createEvent.jsx';
import Map from '../components/events/Map.jsx';
import { useNavigation } from '@react-navigation/native';
import PendingEvents from './events/PendingEvents.jsx';
import { FAB } from '@rneui/themed';
import config from '../config.js';

const Events = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [tab, setTab] = useState('attending');
  const [attendingEvents, setAttendingEvents] = useState([]);

  const sampleUserData = userData;

  useEffect(() => {
    // axios.get(`http://${config.localIP}:${config.port}/attendingEvents/${sampleUserData[0].id}`)
    axios.get(`http://${config.localIP}:${config.port}/attendingEvents/2`)
      .then((results) => {
        setAttendingEvents(results.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
     <></>
    )
  }
  return (
    <SafeAreaView styles={styles.container}>
      <ScrollView>
          <View styles={styles.tabContainer}>
            <Pressable onPress={() => {setTab('attending')}} style={styles.singleTab}>
              <Text style={[styles.tabText, {color: (tab === 'attending') ? '#F49D1A' : '#000000'}]}>Attending</Text>
            </Pressable>
            <Pressable onPress={() => {setTab('pending')}} style={styles.singleTab}>
              <Text style={[styles.tabText, {color: (tab === 'pending') ? '#F49D1A' : '#000000'}]}>Pending</Text>
            </Pressable>
          </View>
          {(tab === 'attending') ?
            <>
              <View style={styles.mapView}>
                <Map attendingEvents={attendingEvents} />
              </View>
              <EventList eventList={attendingEvents} />
              <Button title='Create Event' onPress={() => {
                navigation.navigate('Create Event');
              }}/>
            </>
          : <PendingEvents /> }
      </ScrollView>
    </SafeAreaView>
  )
}

export default Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mapView: {
    backgroundColor: '#F0F0F0',
    paddingBottom: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  singleTab: {
    borderRadius: 3,
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 35,
  },
})
