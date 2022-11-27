import React from 'react';
import { View, FlatList, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import UserCard from './UserCard.jsx';
import userData from '../home/exampleData/userData.js';

const { useState, useRef } = React;

const CarouselCards = ({ localUsers }) => {
  const [userIndex, setUserIndex] = useState(0);
  const [noMoreUsers, setNoMoreUsers] = useState(false);
  const [userList, setUserList] = useState(userData);
  const [swipeDirection, setSwipeDirection] = useState('');
  const omitCard = (id) => {
    userList.splice(
      userList.findIndex((item) => item.id === id),
      1
    );
    setUserList(userList);
    if (userList.length == 0) {
      setNoMoreUsers(true);
    }
  };

  const handleSwipe = (swipeDirection, id) => {
    // on swipe right  - send req to server to  update match status
    setSwipeDirection(swipeDirection);
    //if right swipe - send post req
    // if (swipeDirection === 'right') {
    //   const req = { user1_id: (current user id), user2_id: id, direction: 'right'}
    // }
    // axios.post('/home', req)
    //   .then((res) => console.log('do something'))
    //   .catch((err) => console.log(err))
  };

  return (
    <View style={styles.container}>
      {userList.map((item, key) => (
        <UserCard
          key={key}
          item={item}
          omitCard={() => omitCard(item.id)}
          handleSwipe={handleSwipe}
        />
      ))}
      {noMoreUsers ? (
        <Text h3 style={{ color: '#000' }}>
          You're caught up! Check back soon to find more pups to connect with.
        </Text>
      ) : null}
    </View>
  );
};
export default CarouselCards;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
