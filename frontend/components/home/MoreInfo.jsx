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
      <View style={styles.container}>
        <Chip
          title={item.breed.breed}
          size="sm"
          buttonStyle={styles.chip}
          containerStyle={styles.chipContainer}
          titleStyle={styles.chipText}
        />
        <Chip
          title={item.size}
          size="sm"
          buttonStyle={styles.chip}
          containerStyle={styles.chipContainer}
          titleStyle={styles.chipText}
        />
        <Chip
          title={`${item.energy} Energy`}
          size="sm"
          buttonStyle={styles.chip}
          containerStyle={styles.chipContainer}
          titleStyle={styles.chipText}
        />
        {item.people_friendly ? (
          <Chip
            title="People-Friendly"
            size="sm"
            buttonStyle={styles.chip}
            containerStyle={styles.chipContainer}
            titleStyle={styles.chipText}
          />
        ) : null}
        {item.dog_friendly ? (
          <Chip
            title="Dog-Friendly"
            size="sm"
            buttonStyle={styles.chip}
            containerStyle={styles.chipContainer}
            titleStyle={styles.chipText}
          />
        ) : null}
      </View>
      <Text style={styles.bioText}>{item.bio}</Text>
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
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  chipContainer: {
    padding: 2,
  },
  chip: {
    backgroundColor: '#FFD8A9',
  },
  chipText: {
    color: 'black',
    textTransform: 'capitalize',
  },
  bioText: {
    fontSize: 18,
    paddingLeft: 5,
  },
});
