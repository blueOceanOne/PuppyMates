import React, { useState, useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatPage from './ChatPage.jsx';
import MessagePage from './MessagePage.jsx';
import RequestDetail from './RequestDetail.jsx';
import config from '../../config.js';
import axios from 'axios';

const Stack = createNativeStackNavigator();

const MessagePageNav = ({socket, user}) => {
  const [selectedRequest, setSelectedRequest] = useState({});
  const [selectedRecipient, setSelectedRecipient] = useState({request_sender:{dog_name: ''}});
  const [pending, setPending] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect (()=>{
    let promise1 = axios.get(`http://${config.localIP}:${config.port}/requests/accepted/${user}`);
    let promise2 = axios.get(`http://${config.localIP}:${config.port}/requests/pending/${user}`)
    Promise.all([promise1, promise2])
      .then((values) => {
        setMatched(values[0].data);
        setPending(values[1].data);
      })
      .catch((err)=>{
        console.log(err);
      })
  }, [])

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MessagePage"
        options={{title: ''}}
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
      <Stack.Screen
        name="RequestDetail"
        options={{title: ''}}
        children={()=><RequestDetail selectedRequest={selectedRequest} user={user} setMatched={setMatched} setPending={setPending}/> }/>
      <Stack.Screen
        name="ChatPage"
        options={{
          title: selectedRecipient.request_sender.dog_name,
          headerTintColor: 'black'
        }}
        children={()=><ChatPage socket={socket} selectedRecipient={selectedRecipient} user={user}/>}
      />
    </Stack.Navigator>
  )
}

export default MessagePageNav;