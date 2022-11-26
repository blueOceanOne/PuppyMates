import React from 'react';
import { View, Image, Dimensions, Animated, PanResponder, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon, Divider } from '@rneui/themed';
const { useState, useEffect, useRef } = React;

const ImageGallery = ({ photos, setImgIndex, imgIndex }) => {
  return (
    <View style={styles.dotContainer}>
      {photos.map((photo, index) =>
        imgIndex === index ? (
          <Button
            buttonStyle={{ backgroundColor: '#F49D1A' }}
            key={photo}
            style={styles.dots}
            onPress={() => setImgIndex(index)}
          />
        ) : (
          <Button
            buttonStyle={{ backgroundColor: '#F5EFE6' }}
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
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dots: {
    height: 10,
    width: 10,
    padding: 10,
  },
});
