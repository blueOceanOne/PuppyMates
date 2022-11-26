import React, {useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatPage from './ChatPage.jsx';
import MessagePage from './MessagePage.jsx';
import RequestDetail from './RequestDetail.jsx';

const Stack = createNativeStackNavigator();

const MessagePageNav = ({socket, user}) => {
  const [selectedRequest, setSelectedRequest] = useState({});
  const [selectedRecipient, setSelectedRecipient] = useState('');

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MessagePage"
        children={()=>
          <MessagePage
            socket={socket}
            selectedRequest={selectedRequest}
            setSelectedRequest={setSelectedRequest}
            selectedRecipient={selectedRecipient}
            setSelectedRecipient={setSelectedRecipient}
            user={user}
          />} />
      <Stack.Screen name="RequestDetail" children={()=><RequestDetail selectedRequest={selectedRequest} user={user}/> }/>
      <Stack.Screen name="ChatPage" children={()=><ChatPage socket={socket} selectedRecipient={selectedRecipient} user={user}/>}/>
    </Stack.Navigator>
  )
}

export default MessagePageNav;