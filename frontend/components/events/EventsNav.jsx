import { createNativeStackNavigator} from '@react-navigation/native-stack';
import Events from '../Events.jsx';
import CreateEvent from './createEvent.jsx';
import Guests from './Guests.jsx';
import PendingEvents from './PendingEvents.jsx';

const Stack = createNativeStackNavigator();

const EventsNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Events Home' children={() => <Events />} />
      <Stack.Screen name='Create Event' children={() => <CreateEvent />} />
      <Stack.Screen name='Guests' children={() => <Guests />} />
      <Stack.Screen name='Pending' children={() => <PendingEvents />} />
    </Stack.Navigator>
  )
}

export default EventsNav;