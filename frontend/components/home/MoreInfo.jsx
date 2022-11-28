import React from 'react';
import { View, Image, Dimensions, Animated, PanResponder, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon, Divider, Badge, Header, ButtonGroup, Chip } from '@rneui/themed';
const { useState, useEffect, useRef } = React;
import userData from '../home/exampleData/userData.js';

const MoreInfo = ({ item }) => {
  return (
    <View style={styles.moreInfo}>
      <Text
        style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 5 }}
      >{`${item.city}, ${item.state}`}</Text>
      <View style={styles.chipView}>
        <Chip
          title={item.breed.breed.toLowerCase()}
          size="xs"
          color="#FFD8A9"
          containerStyle={{ padding: 2 }}
          titleStyle={{ color: 'black' }}
        />
        <Chip
          title={item.size}
          size="xs"
          color="#FFD8A9"
          containerStyle={{ padding: 2 }}
          titleStyle={{ color: 'black' }}
        />
        <Chip
          title={`${item.energy} energy`}
          size="xs"
          color="#FFD8A9"
          containerStyle={{ padding: 2 }}
          titleStyle={{ color: 'black' }}
        />
        {item.people_friendly ? (
          <Chip
            title="people-friendly"
            size="xs"
            color="#FFD8A9"
            containerStyle={{ padding: 2 }}
            titleStyle={{ color: 'black' }}
          />
        ) : null}
        {item.dog_friendly ? (
          <Chip
            title="dog-friendly"
            size="xs"
            color="#FFD8A9"
            containerStyle={{ padding: 2 }}
            titleStyle={{ color: 'black' }}
          />
        ) : null}
      </View>
      <Text style={{ fontSize: 18, paddingLeft: 5 }}>{item.bio}</Text>
    </View>
  );
};
export default MoreInfo;
const styles = StyleSheet.create({
  moreInfo: {
    backgroundColor: '#F5EFE6',
    padding: 5,
    borderRadius: 10,
    margin: 10,
  },
  chipView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});
