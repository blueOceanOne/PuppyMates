import React from 'react';
import { View, Image, Dimensions, Animated, PanResponder, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon, Divider } from '@rneui/themed';
const { useState, useEffect, useRef } = React;

const ImageGallery = ({ photos, setImgIndex, imgIndex, email, id }) => {
  return (
    <View style={styles.dotContainer}>
      {photos.map((photo, index) => (
        <Button
          buttonStyle={{ backgroundColor: imgIndex === index ? '#F49D1A' : '#FFE15D' }}
          key={`${photo.url} - ${email} - ${id} - ${index}`}
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
    height: 5,
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '90%',
    position: 'absolute',
    zIndex: 3,
  },
  dots: {
    height: 10,
    width: 5,
    padding: 10,
    zIndex: 3,
  },
});
