import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import MessagePageNav from './messages_components/MessagePageNav.jsx';
import Home from './home/Home.jsx';
import Events from './Events.jsx';
import Profile from './profile/Profile.jsx';
import EventsSub from './EventsSub.jsx';
import EventsNav from './events/EventsNav.jsx';

const Tab = createBottomTabNavigator();

const NavTabs = ({socket, user}) => {
  return (
    <Tab.Navigator
      screenOptions={
        {headerShown: false,
          tabBarActiveTintColor: "black",
          tabBarStyle: [
            {
              "display": "flex"
            },
            null
          ]
        }
      }
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => <Ionicons name="home" size={24} color="#F49D1A" />
          }
        }
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => <Entypo name="message" size={24} color="#F49D1A" />
          }
        }
        name="Messages"
        children={()=><MessagePageNav socket={socket}
        user={user}/>}
      />
      <Tab.Screen
        name="Events"
        component={EventsNav}
        options={{
          tabBarIcon: ({ focused, color, size }) => <Ionicons name="tennisball" size={24} color="#F49D1A" />
          }
        }
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => <Ionicons name="person" size={24} color="#F49D1A" />
          }
        }
      />
    </Tab.Navigator>
  );
};

export default NavTabs;
