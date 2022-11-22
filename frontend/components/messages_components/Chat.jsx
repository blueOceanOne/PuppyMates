import React from 'react';
import { View, Text } from 'react-native';
import { Input, Icon } from '@rneui/themed';

const Chat = () => {
  return (
    <View>
      <Input
      placeholder="Message here"
      leftIcon={{ type: 'font-awesome', name: 'comment' }}
     /*  onChangeText={value => this.setState({ comment: value })} *//>
    </View>
  )
}

export default Chat;