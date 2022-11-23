import React from 'react';
import { View, Image, Dimensions, Animated, PanResponder } from 'react-native';
import { Text, Card, Button, Icon, Divider } from '@rneui/themed';
const { useState, useEffect, useRef } = React;
import userData from '../home/exampleData/userData.js';
import MoreInfo from '../home/MoreInfo.jsx';

const dWidth = Dimensions.get('window').width;
const dHeight = Dimensions.get('window').height;

const UserCard = ({ item, index, onSwipe }) => {
  const [viewMore, setViewMore] = useState(false);

  return (
    <View>
      <Card borderRadius="10">
        <Image
          source={{
            uri: item.photos[0],
          }}
          style={{ height: dHeight * 0.6, width: dWidth * 0.9 }}
          alignSelf="center"
          resizeMode="cover"
          borderRadius="10"
        />
        <View flexDirection="row" justifyContent="space-between">
          <Text h3>{item.dog_name}</Text>
          <Text h3># miles away</Text>
        </View>
        <Button title="Clear" type="clear" onPress={() => setViewMore(!viewMore)}>
          {viewMore ? 'View Less' : 'View More'}
        </Button>
        {viewMore ? <MoreInfo item={item} /> : null}
      </Card>
    </View>
  );
};

export default UserCard;
