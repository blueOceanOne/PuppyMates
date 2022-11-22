import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import config from '../config.js'
import io from 'socket.io-client';
import NavTabs from './Tabs.jsx';

const socket = io(`http://${config.localIP}:${config.port}`);

export default function App() {
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