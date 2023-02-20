import { useState } from 'react';
import axios from 'axios';
import { StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import UserCard from './UserCard.jsx';

import config from '../../config.js';

const CarouselCards = ({ localUsers, setLocalUsers, id }) => {
  const [userIndex, setUserIndex] = useState(0);
  const [noMoreUsers, setNoMoreUsers] = useState(false);
  const [userList, setUserList] = useState(localUsers);
  const [swipeDirection, setSwipeDirection] = useState('');

  const omitCard = (id) => {
    const currInd = localUsers.findIndex((item) => item.id === id);
    localUsers.splice(currInd, 1);

    setLocalUsers(localUsers);
    if (localUsers.length === 0) {
      setNoMoreUsers(true);
    }
  };

  const handleSwipe = (direction, swipedOn_id) => {
    const req = { user1_id: id, user2_id: swipedOn_id, direction: direction };
    axios
      .post(`http://${config.localIP}:${config.port}/home`, req)
      .then(() => setSwipeDirection(swipeDirection))
      .catch((err) => console.log(err));
  };

  return (
    <>
      {localUsers.map((item) => (
        <UserCard
          key={item.email}
          item={item}
          omitCard={() => omitCard(item.id)}
          handleSwipe={handleSwipe}
        />
      ))}
      {noMoreUsers ? (
        <Text h3 style={styles.color}>
          You're caught up! Check back soon to find more pups to connect with.
        </Text>
      ) : null}
    </>
  );
};
export default CarouselCards;

const styles = StyleSheet.create({
  text: {
    color: '#000',
  },
});
