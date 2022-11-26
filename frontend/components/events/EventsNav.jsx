import React, { useState } from 'react';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import Events from '../Events.jsx';
import CreateEvent from './createEvent.jsx';
import Guests from './Guests.jsx';
import PendingEvents from './PendingEvents.jsx';

const Stack = createNativeStackNavigator();

const EventsNav = () => {
  const [invitees, setInvitees] = useState([]);

  return (
    <Stack.Navigator>
      <Stack.Screen name='Events Home' children={() => <Events />} />
      <Stack.Screen name='Create Event' children={() => <CreateEvent invitees={invitees}/>} />
      <Stack.Screen name='Guests' children={() => <Guests invitees={invitees} setInvitees={setInvitees}/>} />
      <Stack.Screen name='Pending' children={() => <PendingEvents />} />
    </Stack.Navigator>
  )
}

export default EventsNav;