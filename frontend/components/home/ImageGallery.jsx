import React from 'react';
import { View, Image, Dimensions, Animated, PanResponder, StyleSheet } from 'react-native';
import { Text, Card, Icon, Divider } from '@rneui/themed';
const { useState, useEffect, useRef } = React;

const ImageGallery = ({ photos, setImgIndex, imgIndex, email, id }) => {
  return (
    <View style={styles.dotContainer}>
      {photos.map((photo, index) => (
        <Icon
          name={'paw'}
          type="material-community"
          iconStyle={imgIndex === index ? styles.icon.current : styles.icon.hidden}
          key={` ${email} - ${id} - ${index}`}
          onPress={() => setImgIndex(index)}
        />
      ))}
    </View>
  );
};
export default ImageGallery;
const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'column',
    // height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    top: '50%',
    left: '90%',
    position: 'absolute',
    zIndex: 2,
  },
  icon: {
    current: {
      // height: 10,
      // width: 10,
      // padding: 10,
      zIndex: 2,
      color: '#F49D1A',
    },
    hidden: {
      // height: 10,
      // width: 10,
      // padding: 10,
      zIndex: 2,
      color: '#FFE15D',
    },
  },
});
