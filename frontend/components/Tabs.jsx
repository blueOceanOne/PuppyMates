import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import MessagePageNav from './messages_components/MessagePageNav.jsx';
import Home from './home/Home.jsx';
import Events from './Events.jsx';
import Profile from './Profile.jsx';
import EventsSub from './EventsSub.jsx';
import EventsNav from './events/EventsNav.jsx';

const Tab = createBottomTabNavigator();

const NavTabs = ({socket, user}) => {
  return (
    <Tab.Navigator
      options={
        {headerTitle: "puppymates"}
      }
    >
      <Tab.Screen name="Home" component={Home} options={
        {title: "puppymates"}
      }/>
      <Tab.Screen
        name="Messages"
        options={
          {title: "puppymates"}
        }
        children={()=><MessagePageNav socket={socket} user={user}/>} />
      <Tab.Screen name="Events" component={EventsNav} options={
          {title: "puppymates"}
        } />
      <Tab.Screen name="Profile" component={Profile} options={
          {title: "puppymates"}
        } />
    </Tab.Navigator>
  );
};

export default NavTabs;
