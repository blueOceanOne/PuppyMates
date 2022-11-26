import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import config from '../config.js';
import io from 'socket.io-client';
import NavTabs from './Tabs.jsx';
import Events from './Events.jsx';
import { Permissions } from 'expo';
import * as Location from 'expo-location';

const socket = io(`http://${config.localIP}:${config.port}`);

export default function App() {
  const [user, setUser] = useState(5);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCoordinates([location.coords.latitude, location.coords.longitude])
    })();
  }, []);

  useEffect(()=>{
    socket.emit('requestID', user);
    socket.on('sendID', (newUser)=>{
      console.log('new user is ', newUser);
      setUser(newUser.id);
    })
  }, [])

  return (
    <NavigationContainer>
      <NavTabs socket={socket} user={user}/>
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
