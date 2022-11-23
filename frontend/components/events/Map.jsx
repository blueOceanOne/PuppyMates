import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import events from '../../sampleData/events.js';

export default function Map() {
  const localEvents = events;
  const markerRender = (localEvent) => {
    return (
      <Marker
        key={localEvent.eventId}
        coordinate={{
          latitude : localEvent.eventLocation[0],
          longitude : localEvent.eventLocation[1]
        }}
        title={localEvent.eventTitle}
        description={localEvent.eventDescription}
        image={{uri: 'https://img.icons8.com/color/96/000000/map-pin.png'}}
      />
    )
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.831234648041054,
          longitude: -122.29168866522882,
          longitudeDelta: 0.4,
          latitudeDelta: 0.3
        }}
      >
        {localEvents.map(each => markerRender(each))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: (Dimensions.get('window').width) * .95,
    height: (Dimensions.get('window').height) * .3,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
  },
});