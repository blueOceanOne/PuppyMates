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

const UserCard = ({ item, index, swipedDirection, removeCard }) => {
  const [viewMore, setViewMore] = useState(false);
  const [imgHeight, setImgHeight] = useState(dHeight * 0.5);
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

  const handleViewMore = () => {
    setViewMore(!viewMore);
    viewMore ? setImgHeight(dHeight * 0.5) : setImgHeight(dHeight * 0.4);
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
      <Card borderRadius="10" containerStyle={{ padding: 0, backgroundColor: '#FFE15D' }}>
        {/* <Card borderRadius="10" containerStyle={{ }}> */}
        <TouchableOpacity onPress={() => handleDisplayImage()}>
          <Image
            style={{ height: imgHeight, width: SCREEN_WIDTH * 0.8, alignSelf: 'center' }}
            borderRadius="10"
            source={{
              uri: item.photos[imgIndex],
            }}
          />
        </TouchableOpacity>
        <ImageGallery photos={item.photos} setImgIndex={setImgIndex} imgIndex={imgIndex} />
        <View flexDirection="row" justifyContent="space-between" style={{ paddingHorizontal: 5 }}>
          <Text h4 style={{ fontWeight: 'bold' }}>
            {item.dog_name}
          </Text>
          <Text h4 style={{ fontWeight: 'bold' }}>
            # miles away
          </Text>
        </View>

        <Button title="Clear" type="clear" onPress={() => handleViewMore()}>
          {viewMore ? 'View Less' : 'View More'}
        </Button>

        {viewMore ? <MoreInfo item={item} /> : null}
      </Card>
    </Animated.View>
  );
};

export default UserCard;
const styles = StyleSheet.create({
  cardStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 7,
  },
});
