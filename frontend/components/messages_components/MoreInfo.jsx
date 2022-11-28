import React from 'react';
import { View, Image, Dimensions, Animated, PanResponder, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon, Divider, Badge, Header, ButtonGroup, Chip } from '@rneui/themed';
const { useState, useEffect, useRef } = React;
import userData from '../home/exampleData/userData.js';

const MoreInfo = ({ selectedUser }) => {
  return (
    <View style={styles.moreInfo}>
      <Text
        style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 5 }}
      >{`${selectedUser.city}, ${selectedUser.state}`}</Text>
      <View style={styles.chipView}>
        <Chip
          title={selectedUser.breed.breed.toLowerCase()}
          size="xs"
          color="#FFD8A9"
          containerStyle={{ padding: 2 }}
          titleStyle={{ color: 'black' }}
        />
        <Chip
          title={selectedUser.size}
          size="xs"
          color="#FFD8A9"
          containerStyle={{ padding: 2 }}
          titleStyle={{ color: 'black' }}
        />
        <Chip
          title={`${selectedUser.energy} Energy`}
          size="xs"
          color="#FFD8A9"
          containerStyle={{ padding: 2 }}
          titleStyle={{ color: 'black' }}
        />
        {selectedUser.people_friendly ? (
          <Chip
            title="People Friendly"
            size="xs"
            color="#FFD8A9"
            containerStyle={{ padding: 2 }}
            titleStyle={{ color: 'black' }}
          />
        ) : null}
        {selectedUser.dog_friendly ? (
          <Chip
            title="Dog Friendly"
            size="xs"
            color="#FFD8A9"
            containerStyle={{ padding: 2 }}
            titleStyle={{ color: 'black' }}
          />
        ) : null}
      </View>
      <Text style={{ fontSize: 16, paddingLeft: 5 }}>{selectedUser.bio}</Text>
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
