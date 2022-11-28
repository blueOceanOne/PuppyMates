import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

export default ViewProfile = ({ navigation }) => {
  const dWidth = Dimensions.get('window').width;
  const dHeight = Dimensions.get('window').height;
  const selectedUser = {
    "bio": "Bio ",
    "breed": "DACHSUND",
    "city": "Peoria",
    "dog_friendly": true,
    "dog_name": "Lucy",
    "user_email": "avarice.boonzaayer@gmail.coma",
    "energy": "low",
    "password": "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
    "people_friendly": true,
    "photos": [
      "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Ffrontend-52647eb6-932d-415c-b6f5-a7e52f5f9912/ImagePicker/73c041e6-f3af-4236-9a5b-3eabcfe1a428.jpeg"
    ],
    "size": "small",
    "state": "AZ",
    "under18": false
  }

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
      source={selectedUser.photos[0]} />
      <Text style={{
        alignSelf: 'center'
      }}>{selectedUser.dog_name}</Text>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 5 }}>
          {`${selectedUser.city}, ${selectedUser.state}`}
        </Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Chip
            title={selectedUser.breed[0] + selectedUser.breed.slice(1).toLowerCase()}
            size="xs"
            color="#FFD8A9"
            containerStyle={{ padding: 2 }}
            titleStyle={{ color: 'black' }}
          />

          <Chip
            title={selectedUser.size[0].toUpperCase() + selectedUser.size.slice(1)}
            size="xs"
            color="#FFD8A9"
            containerStyle={{ padding: 2 }}
            titleStyle={{ color: 'black' }}
          />

          <Chip
            title={`${selectedUser.energy[0].toUpperCase() + selectedUser.energy.slice(1)} Energy`}
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
