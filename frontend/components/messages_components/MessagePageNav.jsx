import React, {useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatPage from './ChatPage.jsx';
import MessagePage from './MessagePage.jsx';
import RequestDetail from './RequestDetail.jsx';

const Stack = createNativeStackNavigator();

const MessagePageNav = ({socket}) => {
  const [selectedRequest, setSelectedRequest] = useState({});
  return (
    <Stack.Navigator>
      <Stack.Screen name="MessagePage" children={()=><MessagePage socket={socket} selectedRequest={selectedRequest} setSelectedRequest={setSelectedRequest}/>} />
      <Stack.Screen name="RequestDetail" children={()=><RequestDetail selectedRequest={selectedRequest} /> }/>
      <Stack.Screen name="ChatPage" children={()=><ChatPage socket={socket}/>} />
    </Stack.Navigator>
  )
}

export default MessagePageNav;