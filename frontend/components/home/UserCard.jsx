import { useState } from 'react';
import { Image, Dimensions, Animated, PanResponder, StyleSheet, Pressable } from 'react-native';

import ImageGallery from '../home/ImageGallery.jsx';
import UserCardInfo from '../home/UserCardInfo.jsx';

const dWidth = Dimensions.get('window').width;
const dHeight = Dimensions.get('window').height;

const UserCard = ({ item, index, handleSwipe, omitCard }) => {
  const [viewMore, setViewMore] = useState(false);
  const [imgHeight, setImgHeight] = useState(dHeight * 0.58);
  const [xPosition, setXPosition] = useState(new Animated.Value(0));
  const [imgIndex, setImgIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState('');

  const cardOpacity = new Animated.Value(1);
  const rotateCard = xPosition.interpolate({
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
        setSwipeDirection('right');
      } else if (gestureState.dx < -dWidth + 250) {
        setSwipeDirection('left');
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dx < dWidth - 150 && gestureState.dx > -dWidth + 150) {
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
        styles.container,
        {
          opacity: cardOpacity,
          transform: [{ translateX: xPosition }, { rotate: rotateCard }],
        },
      ]}
    >
      <Pressable onPress={() => handleViewMore()}>
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

        <UserCardInfo item={item} viewMore={viewMore} />
      </Pressable>
    </Animated.View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#FFE15D',
    borderRadius: 25,
    height: dHeight * 0.66,
    alignSelf: 'center',
    width: dWidth * 0.923,
    zIndex: 3,
    top: 95,
  },

  userImage: {
    zIndex: 2,
    borderRadius: 25,
  },
});
