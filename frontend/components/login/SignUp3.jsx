import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert, Image, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import _ from 'underscore';

export default SignUp3 = ({ navigation, route }) => {
  const [ photos, setPhotos ] = useState([]);

  const handlePickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.photo,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 1,
    });
    setPhotos([ ...photos, result.assets[0].uri ]);
  }

  const nextPage = () => {
    const props = _.extend(route.params, { photos });
    navigation.navigate('Sign Up 4', props)
  }

  const uploadPhotoBtn = photos.length < 6 ? (
    <Button title="Upload photos" onPress={handlePickPhoto} />
  ) : null;

  const nextPageBtn = photos.length ? (
    <Button title="Next" onPress={nextPage} />
  ) : (
    <Button title="Next" disabled />
  )

  return (
    <SafeAreaView>
      <Text>Tell us about your pup</Text>
      <Text>Upload some photos</Text>
      {uploadPhotoBtn}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {photos.map(uri => (
          <View key={uri}>
            <Image source={{ uri }} style={{ width: 100, height: 100 }} />
            <Button title="x" onPress={() => {
              setPhotos(_.filter(photos, photo => (
                photo !== uri
              )))
            }} />
          </View>
        ))}
      </View>
      {nextPageBtn}
    </SafeAreaView>
  )
}
