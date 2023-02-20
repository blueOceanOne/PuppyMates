import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';

import MoreInfo from '../home/MoreInfo.jsx';
const { useState, useEffect } = React;

const UserCardInfo = ({ item }) => {
  return (
    <View style={styles.userInfoContainer}>
      <Text h4 style={styles.text}>
        {item.dog_name}
      </Text>
      <Text h4 style={styles.text}>
        {Math.round(item.distance) > 1
          ? `${Math.round(item.distance)} miles away`
          : `${Math.round(item.distance)} mile away`}
      </Text>
    </View>
  );
};

export default UserCardInfo;

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 3,
    paddingHorizontal: 5,
  },
  text: {
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
  viewIcon: {
    padding: 0,
  },
});
