import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import UserCard from './UserCard.jsx';
import userData from '../home/exampleData/userData.js';

const { useState, useRef } = React;

const CarouselCards = ({ localUsers }) => {
  const [userIndex, setUserIndex] = useState(0);
  const dimensions = Dimensions.get('window');

  const refCarousel = useRef(null);

  const handleSwipe = () => {
    // on swipe - send req to server to  update match status
  };

  return (
    <FlatList
      data={userData}
      renderItem={({ item, index }) => <UserCard item={item} index={index} onSwipe={handleSwipe} />}
      keyExtractor={(item) => item.id}
    />
  );
};
export default CarouselCards;
