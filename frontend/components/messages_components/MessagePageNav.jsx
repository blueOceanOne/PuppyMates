import React, {useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatPage from './ChatPage.jsx';
import MessagePage from './MessagePage.jsx';
import RequestDetail from './RequestDetail.jsx';

const Stack = createNativeStackNavigator();

const MessagePageNav = ({socket, user}) => {
  const [selectedRequest, setSelectedRequest] = useState({});
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [pending, setPending] = useState([]);
  const [matched, setMatched] = useState([]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MessagePage"
        children={()=>
          <MessagePage
            socket={socket}
            user={user}
            selectedRequest={selectedRequest}
            setSelectedRequest={setSelectedRequest}
            selectedRecipient={selectedRecipient}
            setSelectedRecipient={setSelectedRecipient}
            pending={pending}
            setPending={setPending}
            matched={matched}
            setMatched={setMatched}
          />} />
      <Stack.Screen name="RequestDetail" children={()=><RequestDetail selectedRequest={selectedRequest} user={user} setMatched={setMatched} setPending={setPending}/> }/>
      <Stack.Screen name="ChatPage" children={()=><ChatPage socket={socket} selectedRecipient={selectedRecipient} user={user}/>}/>
    </Stack.Navigator>
  )
}

export default MessagePageNav;