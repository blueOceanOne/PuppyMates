import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import events from '../../sampleData/events.js';

export default function Map() {
  const localEvents = events;
  const markerRender = (localEvent) => {
    console.log(localEvent.eventLocation);
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
          longitude: -122.29168866522882
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: (Dimensions.get('window').width) * .9,
    height: (Dimensions.get('window').height) * .3,
    borderRadius: 25
  },
});