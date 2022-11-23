import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import MessagePage from './messages_components/MessagePage.jsx';
import Home from './Home.jsx';
import Events from './Events.jsx';
import Profile from './Profile.jsx';

const Tab = createBottomTabNavigator();

const NavTabs = ({socket}) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Messages" children={()=><MessagePage socket={socket}/>} />
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default NavTabs;