import React from 'react';
import { View, Image, Dimensions, Animated, PanResponder, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon, Divider } from '@rneui/themed';
const { useState, useEffect, useRef } = React;

const ImageGallery = ({ photos, setImgIndex, imgIndex, email, id }) => {
  return (
    <View style={styles.dotContainer}>
      {photos.map((photo, index) => (
        <Button
          buttonStyle={imgIndex === index ? styles.button.current : styles.button.hidden}
          key={` ${email} - ${id} - ${index}`}
          style={styles.dots}
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
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '90%',
    position: 'absolute',
    zIndex: 2,
  },
  dots: {
    height: 10,
    width: 10,
    padding: 10,
    zIndex: 2,
  },
  button: {
    current: {
      backgroundColor: '#F49D1A',
    },
    hidden: {
      backgroundColor: '#FFE15D',
    },
  },
});
