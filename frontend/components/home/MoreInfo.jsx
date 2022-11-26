import React from 'react';
import { View, Image, Dimensions, Animated, PanResponder } from 'react-native';
import { Text, Card, Button, Icon, Divider, Badge, Header, ButtonGroup, Chip } from '@rneui/themed';
const { useState, useEffect, useRef } = React;
import userData from '../home/exampleData/userData.js';

const MoreInfo = ({ item }) => {
  return (
    <View style={{ backgroundColor: '#F5EFE6', padding: 5, borderRadius: 10 }}>
      <Text h4 style={{ fontWeight: 'bold' }}>{`${item.city}, ${item.state}`}</Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Chip title={item.breed} size="xs" color="#FFD8A9" />
        <Chip title={item.size} size="xs" color="#FFD8A9" />
        <Chip title={`${item.energy} Energy`} size="xs" color="#FFD8A9" />
        {item.people_friendly ? <Chip title="People Friendly" size="xs" color="#FFD8A9" /> : null}
        {item.dog_friendly ? <Chip title="Dog Friendly" size="xs" color="#FFD8A9" /> : null}
      </View>
      <Text style={{ fontSize: 18 }}>{item.bio}</Text>
    </View>
  );
};
export default MoreInfo;
