import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatPage from './ChatPage.jsx';
import MessagePage from './MessagePage.jsx';

const Stack = createNativeStackNavigator();

const MessagePageNav = ({socket}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MessagePage" children={()=><MessagePage socket={socket}/>} />
      <Stack.Screen name="ChatPage" children={()=><ChatPage socket={socket}/>} />
    </Stack.Navigator>
  )
}

export default MessagePageNav;