import React from 'react';
import {
  View,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Text, Card, Button, Icon, Divider } from '@rneui/themed';
const { useState, useEffect, useRef } = React;
import userData from '../home/exampleData/userData.js';
import MoreInfo from '../home/MoreInfo.jsx';
import ImageGallery from '../home/ImageGallery.jsx';

const SCREEN_WIDTH = Dimensions.get('window').width;
const dHeight = Dimensions.get('window').height;

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

const UserCard = ({ item, index, swipedDirection, removeCard }) => {
  const [viewMore, setViewMore] = useState(false);
  const [xPosition, setXPosition] = useState(new Animated.Value(0));
  const [imgIndex, setImgIndex] = useState(0);
  let swipeDirection = '';
  let cardOpacity = new Animated.Value(1);
  let rotateCard = xPosition.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-20deg', '0deg', '20deg'],
  });
  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      xPosition.setValue(gestureState.dx);
      if (gestureState.dx > SCREEN_WIDTH - 250) {
        swipeDirection = 'Right';
      } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
        swipeDirection = 'Left';
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx < SCREEN_WIDTH - 150 && gestureState.dx > -SCREEN_WIDTH + 150) {
        swipedDirection('--');
        Animated.spring(xPosition, {
          toValue: 0,
          speed: 5,
          bounciness: 10,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dx > SCREEN_WIDTH - 150) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard();
        });
      } else if (gestureState.dx < -SCREEN_WIDTH + 150) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: -SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard();
        });
      }
    },
  });

  const handleDisplayImage = () => {
    imgIndex === item.photos.length - 1 ? setImgIndex(0) : setImgIndex(imgIndex + 1);
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.cardStyle,
        {
          opacity: cardOpacity,
          transform: [{ translateX: xPosition }, { rotate: rotateCard }],
        },
      ]}
    >
      <Card borderRadius="10">
        <TouchableOpacity onPress={() => handleDisplayImage()}>
          <Image
            borderRadius="10"
            source={{
              uri: item.photos[imgIndex],
            }}
            style={{ height: dHeight * 0.5, width: SCREEN_WIDTH * 0.75 }}
          />
        </TouchableOpacity>
        <ImageGallery photos={item.photos} setImgIndex={setImgIndex} imgIndex={imgIndex} />
        <View flexDirection="row" justifyContent="space-between">
          <Text h3>{item.dog_name}</Text>
          <Text h3># miles away</Text>
        </View>

        <Button title="Clear" type="clear" onPress={() => setViewMore(!viewMore)}>
          {viewMore ? 'View Less' : 'View More'}
        </Button>
        {viewMore ? <MoreInfo item={item} /> : null}
      </Card>
    </Animated.View>
  );
};

export default UserCard;
