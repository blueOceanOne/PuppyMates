import React, { useState } from 'react';
import { View, Pressable, Text, Button, StyleSheet } from 'react-native';
import { Avatar } from '@rneui/themed';

const Guest = ({handleInvite, guest}) => {
  const [invited, setInvited] = useState(false);

  return (
    <Pressable
      key={guest.recipient_id}
      style={({pressed}) => [{backgroundColor: invited ? 'lightgrey' : 'white'}, styles.guestPressable]}
      onPress={() => {handleInvite(guest.recipient_id); setInvited(!invited);}}>
      <View style={styles.guestCard}>
        <Avatar rounded source={{uri: guest.request_recipient.photos[0].url}} />
        <Text style={styles.info}>
          {`${guest.request_recipient.dog_name}`}
        </Text>
      </View>
    </Pressable>
  )
}

export default Guest;

const gap = 8;
const styles = StyleSheet.create({
  selectedGuest: {
    backgroundColor: '#2D70F9',
  },
  guestPressable: {
    flex: 1,
    padding: 12
  },
  guestCard: {
    flex: 1,
    flexDirection: 'row',
  },
  info:{
    marginLeft: 10,
    fontSize: 17,
    justifyContent: 'center',
    paddingTop: 8
  }
})