import React from 'react';
import { View, FlatList, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import UserCard from './UserCard.jsx';
import userData from '../home/exampleData/userData.js';

const { useState, useRef } = React;

const CarouselCards = ({ localUsers }) => {
  const [userIndex, setUserIndex] = useState(0);
  // const dimensions = Dimensions.get('window');
  const [noMoreUsers, setNoMoreUsers] = useState(false);
  const [userList, setUserList] = useState(userData);
  const [swipeDirection, setSwipeDirection] = useState('--');
  const removeCard = (id) => {
    // alert(id);
    userList.splice(
      userList.findIndex((item) => item.id == id),
      1
    );
    setUserList(userList);
    if (userList.length == 0) {
      setNoMoreUsers(true);
    }
  };

  const handleSwipe = (swipeDirection) => {
    // on swipe - send req to server to  update match status
    setSwipeDirection(swipeDirection);
  };

  return (
    <View style={styles.container}>
      {userList.map((item, key) => (
        <UserCard
          key={key}
          item={item}
          removeCard={() => removeCard(item.id)}
          swipedDirection={handleSwipe}
        />
      ))}
      {noMoreUsers ? <Text style={{ fontSize: 22, color: '#000' }}>No users.</Text> : null}
    </View>
  );
};
export default CarouselCards;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
