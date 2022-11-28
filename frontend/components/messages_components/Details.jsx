import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import { Text, Card, Button, Icon, Divider } from '@rneui/themed';
import ImageGallery from './ImageGallery.jsx';
import MoreInfo from './MoreInfo.jsx'

const Details = ({selectedUser}) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [viewMore, setViewMore] = useState(false);
  const [imgHeight, setImgHeight] = useState(dHeight * 0.58);
  const dWidth = Dimensions.get('window').width;
  const dHeight = Dimensions.get('window').height;

  const handleDisplayImage = () => {
    imgIndex === selectedUser.photos.length - 1 ? setImgIndex(0) : setImgIndex(imgIndex + 1);
  };

  const handleViewMore = () => {
    setViewMore(!viewMore);
    viewMore ? setImgHeight(dHeight * 0.58) : setImgHeight(dHeight * 0.45);
  };

  return (
    <Card style={styles.card}>
        <TouchableWithoutFeedback onPress={() => handleDisplayImage()}>
          <Image style= {styles.image}
            source={{
              uri: selectedUser.photos[imgIndex].url,
            }}
          />
        </TouchableWithoutFeedback>
        <ImageGallery photos={selectedUser.photos} setImgIndex={setImgIndex} imgIndex={imgIndex} />
        <View flexDirection="row" justifyContent="space-between" style={{ paddingHorizontal: 5 }}>
          <Text h4 style={{ fontWeight: 'bold', padding: 2 }}>
            {selectedUser.dog_name}
          </Text>
          <Text h4 style={{ fontWeight: 'bold', padding: 2 }}>
            xx miles away
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

        {viewMore ? <MoreInfo selectedUser={selectedUser} /> : null}
      </Card>
  )
}

export default Details;

const styles = StyleSheet.create({
  card: {
    padding: 0,
    marginTop: 40,
    backgroundColor: '#FFE15D',
    borderRadius: 10
  },

  image: {
    height: 250,
    width: 350,
    alignSelf: 'center',
    zIndex: 2,
    borderRadius: 10
  }


})