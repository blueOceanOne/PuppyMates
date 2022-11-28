import React, { useState, useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChatPage from './ChatPage.jsx';
import MessagePage from './MessagePage.jsx';
import RequestDetail from './RequestDetail.jsx';
import config from '../../config.js';
import axios from 'axios';

const Stack = createNativeStackNavigator();

const MessagePageNav = ({socket, user}) => {
  const [selectedRequest, setSelectedRequest] = useState({});
  const [selectedRecipient, setSelectedRecipient] = useState({request_sender:{dog_name: ''}, request_recipient:{dog_name:''}});
  const [pending, setPending] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect (()=>{
    let promise1 = axios.get(`http://${config.localIP}:${config.port}/requests/matched/${user}`);
    let promise2 = axios.get(`http://${config.localIP}:${config.port}/requests/pending/${user}`)
    Promise.all([promise1, promise2])
      .then((values) => {
        setMatched(values[0].data);
        setPending(values[1].data);
      })
      .catch((err)=>{
        console.log(err);
      })
  }, []);

  const navigation = useNavigation();

  const handleAcceptorReject = (action) => {
    let target = selectedRecipient.sender_id === user ? selectedRecipient.recipient_id : selectedRecipient.sender_id;

    axios.put(`http://${config.localIP}:${config.port}/requests/${action}/${user}`, null, { params: { participant_id: target}})
    .then(()=>{
      console.log(action);
      let promise1 = axios.get(`http://${config.localIP}:${config.port}/requests/matched/${user}`);
      let promise2 = axios.get(`http://${config.localIP}:${config.port}/requests/pending/${user}`)
      Promise.all([promise1, promise2])
        .then((values) => {
          setMatched(values[0].data);
          setPending(values[1].data);
          navigation.navigate('MessagePage');
        })
        .catch((err)=>{
          console.log(err);
        })
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const chatTitle = selectedRecipient.sender_id === user? selectedRecipient.request_recipient.dog_name : selectedRecipient.request_sender.dog_name;

  return (
    <Stack.Navigator style={{backgroundColor: 'white'}}>
      <Stack.Screen
        name="MessagePage"
        options={{title: '', headerShown: false,}}
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
        options={{
          title: '',
          headerShadowVisible: false,
          headerTintColor: '#F49D1A',
          headerStyle: {
            height: 100
          }
        }}
        children={()=><RequestDetail selectedRequest={selectedRequest} user={user} setMatched={setMatched} setPending={setPending}/> }/>
      <Stack.Screen
        name="ChatPage"
        options={{
          title: chatTitle,
          headerTintColor: 'black',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: '24px'
          },
          headerRight: () => (
            <Button
            onPress={() => handleAcceptorReject('reject', )}
            title="Unmatch"
            color="#EC7272"
          />
          )
        }}
        children={()=><ChatPage socket={socket} selectedRecipient={selectedRecipient} user={user}/>}
      />
    </Stack.Navigator>
  )
}

export default MessagePageNav;