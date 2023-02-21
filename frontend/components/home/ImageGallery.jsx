import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';

const ImageGallery = ({ photos, setImgIndex, imgIndex, email, id }) => {
  return (
    <View style={styles.container}>
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
  container: {
    flexDirection: 'column',
    top: '50%',
    left: '90%',
    position: 'absolute',
    zIndex: 2,
  },
  icon: {
    current: {
      zIndex: 2,
      color: '#F49D1A',
    },
    hidden: {
      zIndex: 2,
      color: '#FFE15D',
    },
  },
});
