import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import config from '../config.js'
import io from 'socket.io-client';
import Chat from './messages_components/Chat.jsx';
import Home from './Home.jsx';
import Events from './Events.jsx';
import Profile from './Profile.jsx';
const socket = io(`${config.localIP}:4000`);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

socket.on("hello", (arg)=>{
  console.log(arg);
})

socket.emit("howdy", "stranger");

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Testing with cats</Text>
      <StatusBar style="auto" />
    </View>
  );
}
