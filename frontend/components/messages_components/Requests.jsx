import React from 'react';
import { View, Text } from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';
import pendingData from './requestsData.js';

const Requests = () => {
  return (
    <View>
      <Text>Pending requests</Text>
      {
        pendingData.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{uri: item.photo}} />
            <ListItem.Content>
              <ListItem.Title>{item.dog_name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))
      }
    </View>
  )
}

export default Requests;