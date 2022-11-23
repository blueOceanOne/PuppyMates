import React from 'react';
import { View, Image, Dimensions, Animated, PanResponder } from 'react-native';
import { Text, Card, Button, Icon, Divider, Badge, Header, ButtonGroup } from '@rneui/themed';
const { useState, useEffect, useRef } = React;
import userData from '../home/exampleData/userData.js';

const MoreInfo = ({ item }) => {
  return (
    <Card width="100%" alignSelf="center" borderRadius="10">
      <Text h4>{`${item.city}, ${item.state}`}</Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'left',
        }}
      >
        <Button
          title={item.breed}
          size="xs"
          buttonStyle={{
            backgroundColor: '#FFD8A9',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 10,
            marginBottom: 6,
          }}
        />
        <Button
          title={`${item.energy} energy`}
          size="xs"
          buttonStyle={{
            backgroundColor: '#FFD8A9',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 10,
          }}
        />
        {item.people_friendly ? (
          <Button
            title="People friendly"
            size="xs"
            buttonStyle={{
              backgroundColor: '#FFD8A9',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 10,
            }}
          />
        ) : null}
        {item.dog_friendly ? (
          <Button
            title="Dog friendly"
            size="xs"
            buttonStyle={{
              backgroundColor: '#FFD8A9',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 10,
            }}
          />
        ) : null}
      </View>
      <Text>{item.bio}</Text>
    </Card>
  );
};
export default MoreInfo;
