import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import MessagePageNav from './messages_components/MessagePageNav.jsx';
import Home from './home/Home.jsx';
import Events from './Events.jsx';
import Profile from './Profile.jsx';
import EventsSub from './EventsSub.jsx';

const Tab = createBottomTabNavigator();

const NavTabs = ({socket, user}) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Messages" children={()=><MessagePageNav socket={socket} user={user}/>} />
      <Tab.Screen name="EventsSub" component={EventsSub} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default NavTabs;
