import React from 'react';
import { View, Text } from 'react-native'
import ChatPage from './ChatPage.jsx';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const ChatsList = ({socket}) => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>ChatsList</Text>
      <Button
        title="Chat in Room 1"
        onPress = {(event)=>{
        event.preventDefault();
        navigation.navigate('ChatPage')
      }} />
    </View>
  )
}

export default ChatsList;