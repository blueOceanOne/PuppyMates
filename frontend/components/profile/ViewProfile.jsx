import React from 'react';
import { View, Text, Button, Image, StyleSheet, Dimensions } from 'react-native';

export default ViewProfile = ({ navigation }) => {
  const dWidth = Dimensions.get('window').width;
  const dHeight = Dimensions.get('window').height;

  return (
    <View style={styles.moreInfo}>
      <Button title="Log Out" style={{
        float: 'right',
        width: 50,
        backgroundColor: '#fff',
        color: '#000'
      }} />
      <Image style={{
        alignSelf: 'center',
        zIndex: 2,
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 10,
        borderRadius: 20
      }}
      source={'https://www.akc.org/wp-content/uploads/2017/11/Longhaired-Dachshund-standing-outdoors.jpg'} />
      <Text style={{
        alignSelf: 'center'
      }}>Lucy</Text>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 5 }}>
          Peoria, AZ
        </Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Chip
            title="Dachsund"
            size="xs"
            color="#FFD8A9"
            containerStyle={{ padding: 2 }}
            titleStyle={{ color: 'black' }}
          />

          <Chip
            title="Small"
            size="xs"
            color="#FFD8A9"
            containerStyle={{ padding: 2 }}
            titleStyle={{ color: 'black' }}
          />

          <Chip
            title="Low Energy"
            size="xs"
            color="#FFD8A9"
            containerStyle={{ padding: 2 }}
            titleStyle={{ color: 'black' }}
          />

          <Chip
            title="People Friendly"
            size="xs"
            color="#FFD8A9"
            containerStyle={{ padding: 2 }}
            titleStyle={{ color: 'black' }}
          />
        </View>
        <Text style={{ fontSize: 16, paddingLeft: 5 }}>This is a bio.</Text>
      </View>
      <Button title="Edit Profile" style={{
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 4
      }} />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    marginTop: 5,
    marginHorizontal: 5,
    backgroundColor: '#FFE15D',
    borderRadius: 20,
  },

  image: {
    height: 250,
    width: 350,
    alignSelf: 'center',
    zIndex: 2,
    borderRadius: 20,
    margin:10
  },

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
})
