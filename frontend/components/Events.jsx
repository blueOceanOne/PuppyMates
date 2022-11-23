import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import eventData from '../sampleData/events.js';
import EventList from '../components/events/EventList.jsx';
import Map from '../components/events/Map.jsx';

const Events = () => {
  const [tab, setTab] = useState('attending');
  const sampleEvents = eventData;

  return (
    <SafeAreaView styles={styles.container}>
      <ScrollView>
        <View styles={styles.tabContainer}>
          <Pressable onPress={() => {setTab('attending')}} style={styles.singleTab}>
            <Text style={[styles.tabText, {color: (tab === 'attending') ? '#F49D1A' : '#000000'}]}>Attending</Text>
          </Pressable>
          <Pressable onPress={() => {setTab('pending')}} style={styles.unsingleTab}>
            <Text style={[styles.tabText, {color: (tab === 'pending') ? '#F49D1A' : '#000000'}]}>Pending</Text>
          </Pressable>
        </View>
        <View style={styles.mapView}>
          <Map />
        </View>
        <EventList eventList={sampleEvents} />
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
    flexWrap: 'wrap',
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