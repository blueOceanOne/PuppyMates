import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import Chat from './messages_components/Chat.jsx';
import Home from './home/Home.jsx';
import Events from './Events.jsx';
import Profile from './Profile.jsx';

const Tab = createBottomTabNavigator();

const NavTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Messages" component={Chat} />
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default NavTabs;
