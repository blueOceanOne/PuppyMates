import React from 'react';
import { View, Text, Button } from 'react-native';

const RequestDetail = ({selectedRequest}) => {
  return (
    <View>
      <Text>Dog Detail page of {selectedRequest.dog_name}</Text>
      <Button title="Accept">Accept</Button>
      <Button title="Reject">Reject</Button>
    </View>
  )
}

export default RequestDetail;