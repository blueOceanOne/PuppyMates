import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import { Button } from '@rneui/themed';
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
            <Button color='#F0F0F0' onPress={() => {setTab('attending')}} style={styles.singleTab}>
              <Text style={[styles.tabText, {color: (tab === 'attending') ? '#F49D1A' : '#000000'}]}>Attending</Text>
            </Button>
            <Button color='#F0F0F0' onPress={() => {setTab('pending')}} style={styles.singleTab}>
              <Text style={[styles.tabText, {color: (tab === 'pending') ? '#F49D1A' : '#000000'}]}>Pending</Text>
            </Button>
          </View>
          {(tab === 'attending') ?
            <>
              <View style={styles.mapView}>
                <Map attendingEvents={attendingEvents} />
              </View>
              <EventList eventList={attendingEvents} />
            </>
          : <PendingEvents /> }
      </ScrollView>
      <View style={styles.createButton}>
        <FAB
          visible={true}
          placement='right'
          icon={{ name: 'add', color: 'white' }}
          color="#007AFF"
          onPress={() => {
            navigation.navigate('Create Event');
          }}
        />
      </View>
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
    flex: 1,
    flexDirection: 'row',
  },
  singleTab: {
    borderRadius: 3,
    // width: 150,
    backgroundColor: 'gray'
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  createButton: {
    //position: 'absolute',
    bottom: 0,
    // left: (Dimensions.get('window').width) * 1,
  },
})
