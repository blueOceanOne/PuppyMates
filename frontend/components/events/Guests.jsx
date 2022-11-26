import React, { useState } from 'react';
import { View, ScrollView, Text, Pressable, Button, StyleSheet } from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';
import userData from '../home/exampleData/userData.js';

const Guests = ({setOpen, DYNAMICUSERINFO}) => {
  const sampleData = userData;
  const [invitees, setInvitees] = useState([]);

  const handleInvite = (guestId) => {
    const userIdInList = invitees.indexOf(guestId);
    if (userIdInList !== -1) {
      invitees.splice(userIdInList, 1);
    } else {
      invitees.push(guestId);
      setInvitees([...invitees]);
  }
  };

  return (
    <ScrollView>
      { sampleData.map((each) => {
        return (
          <ListItem
            key={each.id}
            style={ invitees.indexOf(each.id) === -1 ? styles.unselectedGuest : styles.selectedGuest }
          >
            <Pressable onPress={() => {handleInvite(each.id)}}>
            <Avatar source={{uri: each.photos[0]}} />
              <ListItem.Title>
                {each['dog_name']}
              </ListItem.Title>
              <Text>
                {each.username}
              </Text>
            </Pressable>
          </ListItem>
        )
      })}
    </ScrollView>
  )
}

export default Guests;

const styles = StyleSheet.create({
  selectedGuest: {
    backgroundColor: '#2D70F9',
  },
  unselectedGuest: {
  }
})