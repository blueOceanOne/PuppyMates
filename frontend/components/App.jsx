import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import config from '../config.js';
import io from 'socket.io-client';
import NavTabs from './Tabs.jsx';
import Events from './Events.jsx';
import { Permissions } from 'expo';
/* import * as Location from 'expo-location'; */

const socket = io(`http://${config.localIP}:${config.port}`);

export default function App() {
/*   const [errorMsg, setErrorMsg] = useState(null);
  const [geolocation, setGeolocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setGeolocation(location);
    })();
  }, []); */

  //   SAMPLE DATA OF LOCATION RETURN FROM ABOVE FUNCTION
  //   ALSO AVAILABLE WITHIN SAMPLE DATA
  //   {"coords":
  //   {
  //     "speed":-1,
  //     "longitude":-123.444423,
  //     "latitude":39.664243,
  //     "accuracy":5,
  //     "heading":-1,
  //     "altitude":0,
  //     "altitudeAccuracy":-1
  //   },
  //   "timestamp":1669174971110.204
  //   }

/*   let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (geolocation) {
    text = JSON.stringify(geolocation);
    console.log(text);
  } */

  return (
    <NavigationContainer>
      <NavTabs socket={socket}/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
