import React from 'react';
import { View, Text, Button, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Header, Chip } from '@rneui/themed';

export default ViewProfile = ({ navigation }) => {
  const dWidth = Dimensions.get('window').width;
  const dHeight = Dimensions.get('window').height;

  return (
    <View style={{
      backgroundColor: '#fff',
      height: '100%'
    }}>
      <View style={styles.moreInfo}>
        <Image style={{
          alignSelf: 'center',
          zIndex: 2,
          width: 200,
          height: 200,
          borderRadius: 50,
          margin: 10,
          borderRadius: 100,
        }}
        source={{uri: 'https://www.akc.org/wp-content/uploads/2017/11/Longhaired-Dachshund-standing-outdoors.jpg'}} />
        <Text style={{
          alignSelf: 'center',
          fontSize: 22,
          fontWeight: 'bold',
          paddingLeft: 5
        }}>Lucy</Text>
        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold', paddingLeft: 5, alignSelf: 'center' }}>
            Peoria, AZ
          </Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10, paddingHorizontal: 5}}>
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

            <Chip
              title="Dog Friendly"
              size="xs"
              color="#FFD8A9"
              containerStyle={{ padding: 2 }}
              titleStyle={{ color: 'black' }}
            />
          </View>
          <Text style={{ fontSize: 16, paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}>I love sleeping all day and stealing my brother's bed.</Text>
        </View>
      </View>
      <TouchableOpacity style={{
        backgroundColor: '#fff',
        borderRadius: 15,
        borderColor: '#000',
        borderWidth: 2,
        marginTop: 5,
        padding: 13,
        width: 369,
        marginHorizontal: 5,
        alignItems: 'center',
        alignSelf: 'center'
      }}>
        <Text>
          Edit Profile
        </Text>
      </TouchableOpacity>
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
