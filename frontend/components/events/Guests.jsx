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
    } else {
      invitees.push(guestId);
      setInvitees([...invitees]);
    }
  };

  const handleConfirm = () => {
    navigation.navigate('Create Event');
  }

  return (
    <ScrollView>
      <Button title='Confirm Guests' onPress={handleConfirm}/>
      { sampleData.map((each) => {
        const [invited, setInvited] = useState(false);
        return (
          <Pressable
            key={each.id}
            style={({pressed}) => [{backgroundColor: invited ? 'lightgrey' : 'white'}, styles.guestPressable]}
            onPress={() => {handleInvite(each.id); setInvited(!invited);}}>
            <View style={styles.guestCard}>
              <Avatar rounded source={{uri: each.photos[0]}} />
              <Text style={styles.info}>
                {`${each['dog_name']} | ${each.username}`}
              </Text>
            </View>
          </Pressable>
        )
      })}
    </ScrollView>
  )
}

export default Guests;

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