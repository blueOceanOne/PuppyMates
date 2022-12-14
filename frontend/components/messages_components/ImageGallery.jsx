import React from 'react';
import { View, Image, Dimensions, Animated, PanResponder, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon, Divider } from '@rneui/themed';
const { useState, useEffect, useRef } = React;

const ImageGallery = ({ photos, setImgIndex, imgIndex }) => {
  const photoURLs = photos.map((photo)=>(photo.url))

  return (
    <View style={styles.dotContainer}>
      {photoURLs.map((photo, index) =>
        imgIndex === index ? (
          <Button
            buttonStyle={{ backgroundColor: '#F49D1A' }}
            key={photo}
            style={styles.dots}
            onPress={() => setImgIndex(index)}
          />
        ) : (
          <Button
            buttonStyle={{ backgroundColor: '#FFE15D' }}
            key={photo}
            style={styles.dots}
            onPress={() => setImgIndex(index)}
          />
        )
      )}
    </View>
  );
};
export default ImageGallery;
const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    height: 5,
    justifyContent: 'center',
    alignItems: 'center',
    top: '4%',
    left: '33%',
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