import React, { useState } from 'react';
import { View, ScrollView, Text, Pressable, Button, StyleSheet } from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';
import userData from '../home/exampleData/userData.js';
import { useNavigation } from '@react-navigation/native';

const Guests = ({invitees, setInvitees}) => {
  const navigation = useNavigation();
  const sampleData = userData;

  const handleInvite = (guestId) => {
    const userIdInList = invitees.indexOf(guestId);
    if (userIdInList !== -1) {
      invitees.splice(userIdInList, 1);
      console.log(invitees);
    } else {
      invitees.push(guestId);
      setInvitees([...invitees]);
      console.log(invitees);
    }
  };

  const handleConfirm = () => {
    navigation.navigate('Create Event');
  }

  return (
    <ScrollView>
      <Button title='Confirm Guests' onPress={handleConfirm}/>
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