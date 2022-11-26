import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { events, userData } from '../sampleData/events.js';
import EventList from '../components/events/EventList.jsx';
import CreateEvent from './events/createEvent.jsx';
import Map from '../components/events/Map.jsx';
import { useNavigation } from '@react-navigation/native';
import PendingEvents from './events/PendingEvents.jsx';
import { FAB } from '@rneui/themed';

const Events = () => {
  const navigation = useNavigation();
  const [tab, setTab] = useState('attending');

  const sampleEvents = events;

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
                <Map />
              </View>
              <EventList eventList={sampleEvents} />
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
