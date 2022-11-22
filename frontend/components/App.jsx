import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import config from '../config.js'
import io from 'socket.io-client';
import NavTabs from './Tabs.jsx';


const socket = io(`${config.localIP}:4000`);
socket.on("hello", (arg)=>{
  console.log(arg);
})
socket.emit("howdy", "stranger");


export default function App() {
  return (
    <NavigationContainer>
      <NavTabs />
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