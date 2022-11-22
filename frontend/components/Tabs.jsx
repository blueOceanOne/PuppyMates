import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import Chat from './messages_components/Chat.jsx';
import Home from './Home.jsx';
import Events from './Events.jsx';
import Profile from './Profile.jsx';

const Tab = createBottomTabNavigator();
console.log ('home is ', Home)
console.log(Tab)

/* const Home = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
    </View>
  )
} */

const NavTabs = () => {

  return (
    <Tab.navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Messages" component={Chat} />
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.navigator>
  )
}

export default NavTabs;