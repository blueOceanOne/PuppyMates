import React from 'react';
import { View, ScrollView, Text, Pressable, Button } from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';
import userData from '../home/exampleData/userData.js';

const Guests = ({setOpen, DYNAMICUSERINFO}) => {
  const sampleData = userData;
  console.log('SAMPLE DATA: ', sampleData);


  return (
    <ScrollView>
      { sampleData.map((each) => {
        console.log('each mapped item: ', each);
        return (
          <ListItem key={each.id}>
            <Pressable>
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
      <Button onPress={() => {setOpen(false)}} title='Cancel' />
    </ScrollView>
  )
}

export default Guests;