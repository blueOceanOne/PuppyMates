import React from 'react';
import { View, FlatList, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import UserCard from './UserCard.jsx';
import userData from '../home/exampleData/userData.js';

const { useState, useRef } = React;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  cardStyle: {
    width: '75%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 7,
  },
  cardTitleStyle: {
    color: '#fff',
    fontSize: 24,
  },
  swipeText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

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
    // <FlatList
    //   data={userList}
    //   renderItem={({ item, index }) => (
    //     <UserCard item={item} index={index} swipedDirection={handleSwipe} />
    //   )}
    //   keyExtractor={(item) => item.id}
    // />
    // <SafeAreaView style={{ flex: 1 }}>
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
    // </SafeAreaView>
  );
};
export default CarouselCards;
