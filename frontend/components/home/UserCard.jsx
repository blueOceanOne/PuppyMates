import React from 'react';
import {
  View,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text, Card, Button, Icon, Divider } from '@rneui/themed';
import { getDistance } from 'geolib';

import userData from '../home/exampleData/userData.js';
import MoreInfo from '../home/MoreInfo.jsx';
import ImageGallery from '../home/ImageGallery.jsx';

const { useState, useEffect, useRef } = React;
const dWidth = Dimensions.get('window').width;
const dHeight = Dimensions.get('window').height;

const UserCard = ({ item, index, handleSwipe, omitCard }) => {
  const [viewMore, setViewMore] = useState(false);
  const [imgHeight, setImgHeight] = useState(dHeight * 0.58);
  const [xPosition, setXPosition] = useState(new Animated.Value(0));
  const [imgIndex, setImgIndex] = useState(0);
  let swipeDirection = '';
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
        swipeDirection = 'right';
      } else if (gestureState.dx < -dWidth + 250) {
        swipeDirection = 'left';
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

  const calcDistance = (currItem) => {
    // will switch to current user's geolocation - geolocation.latitude, geolocation.longitude
    const start = { latitude: 34.0533447265625, longitude: -118.24234771728516 };
    //current card
    const end = { latitude: currItem.latitude, longitude: currItem.longitude };
    const meters = getDistance(start, end);
    const miles = Math.round(meters / 1609.344);
    return miles;
  };

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
        styles.cardStyle,
        {
          opacity: cardOpacity,
          transform: [{ translateX: xPosition }, { rotate: rotateCard }],
        },
      ]}
    >
      <Card
        borderRadius="10"
        containerStyle={{
          padding: 0,
          marginTop: 40,
          backgroundColor: '#FFE15D',
        }}
      >
        <TouchableWithoutFeedback onPress={() => handleDisplayImage()}>
          <Image
            style={{
              height: imgHeight,
              width: dWidth * 0.91,
              alignSelf: 'center',
              zIndex: 2,
            }}
            borderRadius="10"
            source={{
              uri: item.photos[imgIndex],
            }}
          />
        </TouchableWithoutFeedback>
        <ImageGallery photos={item.photos} setImgIndex={setImgIndex} imgIndex={imgIndex} />
        <View flexDirection="row" justifyContent="space-between" style={{ paddingHorizontal: 5 }}>
          <Text h4 style={{ fontWeight: 'bold', padding: 2 }}>
            {item.dog_name}
          </Text>
          <Text h4 style={{ fontWeight: 'bold', padding: 2 }}>
            {calcDistance(item)} miles away
          </Text>
        </View>
        {viewMore ? (
          <Icon
            name={'chevron-up'}
            type="material-community"
            containerStyle={{ justifyContent: 'flex-start' }}
            onPress={() => handleViewMore()}
          />
        ) : (
          <Icon
            name={'chevron-down'}
            type="material-community"
            containerStyle={{ padding: 0 }}
            containerStyle={{ justifyContent: 'flex-start' }}
            onPress={() => handleViewMore()}
          />
        )}

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
    height: dHeight * 0.8,
  },
});
