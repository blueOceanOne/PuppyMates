import React from 'react';
import { View, Text } from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import RequestDetail from './RequestDetail.jsx';
import pendingData from './requestsData.js';

const Requests = ({selectedRequest, setSelectedRequest, user}) => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Pending requests</Text>
      {
        pendingData.map((item, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress = {(event) => {
              event.preventDefault();
              setSelectedRequest(item);
              navigation.navigate('RequestDetail');
            }}
          >
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