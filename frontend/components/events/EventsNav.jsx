import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import Events from '../Events.jsx';
import CreateEvent from './createEvent.jsx';
import Guests from './Guests.jsx';
import PendingEvents from './PendingEvents.jsx';
import axios from 'axios';
import config from '../../config.js';

const Stack = createNativeStackNavigator();

const EventsNav = () => {
  const [invitees, setInvitees] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get(`http://${config.localIP}:${config.port}/requests/matched/1`)
      .then((results) => {
        setMatches(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name='Events Home' options={{headerShown: false}} children={() => <Events />} />
      <Stack.Screen name='Create Event' children={() => <CreateEvent matches={matches} invitees={invitees} setInvitees={setInvitees}/>} />
      <Stack.Screen name='Guests' children={() => <Guests invitees={invitees} matches={matches} setInvitees={setInvitees}/>} />
      <Stack.Screen name='Pending' children={() => <PendingEvents />} />
    </Stack.Navigator>
  )
}

export default EventsNav;