import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import Requests from './Requests.jsx';
import ChatsList from './ChatsList.jsx';
import { Button } from '@rneui/themed';

const MessagePage = ({socket, user, selectedRequest, setSelectedRequest, selectedRecipient, setSelectedRecipient, pending, setPending, matched, setMatched}) => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Requests selectedRequest={selectedRequest} setSelectedRequest={setSelectedRequest} user={user} pending={pending} setPending={setPending}/>
        <ChatsList socket={socket} selectedRecipient={selectedRecipient} setSelectedRecipient={setSelectedRecipient} user={user} matched={matched} setMatched={setMatched}/>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white'
  },
});


export default MessagePage;