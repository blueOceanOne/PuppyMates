import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';

import MoreInfo from '../home/MoreInfo.jsx';

const UserCardInfo = ({ item, viewMore }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text h4 style={styles.text}>
          {item.dog_name}
        </Text>
        <Text h4 style={styles.text}>
          {Math.round(item.distance) > 1
            ? `${Math.round(item.distance)} miles away`
            : `${Math.round(item.distance)} mile away`}
        </Text>
      </View>
      {viewMore ? <MoreInfo item={item} /> : null}
    </View>
  );
};

export default UserCardInfo;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});
