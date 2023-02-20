import React from 'react';
import {
  View,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import { Text, Card, Button, Icon, Divider } from '@rneui/themed';

import MoreInfo from '../home/MoreInfo.jsx';
import ImageGallery from '../home/ImageGallery.jsx';
import UserCardInfo from '../home/UserCardInfo.jsx';

const { useState, useEffect } = React;
const dWidth = Dimensions.get('window').width;
const dHeight = Dimensions.get('window').height;

const UserCard = ({ item, index, handleSwipe, omitCard }) => {
  const [viewMore, setViewMore] = useState(false);
  const [imgHeight, setImgHeight] = useState(dHeight * 0.58);
  const [xPosition, setXPosition] = useState(new Animated.Value(0));
  const [imgIndex, setImgIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState('');

  let cardOpacity = new Animated.Value(1);
  let rotateCard = xPosition.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-20deg', '0deg', '20deg'],
  });
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => false,
    onMoveShouldSetPanResponder: (e, gestureState) => true,
    onStartShouldSetPanResponderCapture: (e, gestureState) => false,
    onMoveShouldSetPanResponderCapture: (e, gestureState) => true,
    onPanResponderMove: (e, gestureState) => {
      xPosition.setValue(gestureState.dx);
      if (gestureState.dx > dWidth - 250) {
        // swipeDirection = 'right';
        setSwipeDirection('right');
      } else if (gestureState.dx < -dWidth + 250) {
        // swipeDirection = 'left';
        setSwipeDirection('left');
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dx < dWidth - 150 && gestureState.dx > -dWidth + 150) {
        handleSwipe('');
        Animated.spring(xPosition, {
          toValue: 0,
          speed: 5,
          bounciness: 10,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dx > dWidth - 150) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: dWidth,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          handleSwipe(swipeDirection, item.id);
          omitCard();
        });
      } else if (gestureState.dx < -dWidth + 150) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: -dWidth,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          handleSwipe(swipeDirection);
          omitCard();
        });
      }
    },
  });

  const handleDisplayImage = () => {
    imgIndex === item.photos.length - 1 ? setImgIndex(0) : setImgIndex(imgIndex + 1);
  };

  const handleViewMore = () => {
    setViewMore(!viewMore);
    viewMore ? setImgHeight(dHeight * 0.58) : setImgHeight(dHeight * 0.45);
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.cardAnimatedContainer,
        {
          opacity: cardOpacity,
          transform: [{ translateX: xPosition }, { rotate: rotateCard }],
        },
      ]}
    >
      <Pressable onPress={() => handleViewMore()}>
        <Card containerStyle={styles.cardContainer}>
          <Pressable onPress={() => handleDisplayImage()}>
            <Image
              style={[
                styles.userImage,
                {
                  height: imgHeight,
                  width: dWidth * 0.923,
                },
              ]}
              source={{
                uri: item.photos[imgIndex].url,
              }}
            />
          </Pressable>
          <ImageGallery
            photos={item.photos}
            setImgIndex={setImgIndex}
            imgIndex={imgIndex}
            email={item.email}
            id={item.id}
          />

          <UserCardInfo item={item} />
          {viewMore ? <MoreInfo item={item} /> : null}
        </Card>
      </Pressable>
    </Animated.View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  cardAnimatedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 10,
    height: dHeight * 0.663,
    alignSelf: 'center',
    width: dWidth * 0.923,
    // borderWidth: 2,
    borderColor: 'blue',
    zIndex: 3,
  },
  cardContainer: {
    padding: 0,
    backgroundColor: '#FFE15D',
    // backgroundColor: 'green',

    borderWidth: 0,
    // borderColor: '#FFE15D',
    borderColor: 'red',
    // borderWidth: 2,
    borderRadius: 10,
    height: dHeight * 0.663,
    width: dWidth * 0.923,
  },
  userImage: {
    alignSelf: 'center',
    zIndex: 2,
    borderRadius: '10',
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 3,
    paddingHorizontal: 5,
  },
  text: {
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
  viewIcon: {
    padding: 0,
  },
});
