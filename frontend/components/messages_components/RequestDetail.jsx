import React from 'react';
import { View, Text, Button } from 'react-native';

const RequestDetail = ({selectedRequest}) => {
  console.log('selectedRequest is ', selectedRequest)
  return (
    <View>
      <Text>Dog Detail page of{/*  {selectedRequest.request_sender.dog_name} */}</Text>
      <Button title="Accept">Accept</Button>
      <Button title="Reject">Reject</Button>
    </View>
  )
}

export default RequestDetail;