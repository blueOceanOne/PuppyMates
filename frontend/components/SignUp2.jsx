import React, { useState } from 'react';
import _ from 'underscore';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
// import cities from 'https://gist.githubusercontent.com/avaboonzaayer/439bc2e05d97f4eae082179934d37ac3/raw/0ef9a7fdb83b42b4d69563ee544399a7b23927ed/states.json';

export default SignUp2 = ({ navigation, route }) => {
  const [ dog_name, setDogName ] = useState('');
  // const [ state, setState ] = useState('');
  // const [ city, setCity ] = useState('');
  const [ breed, setBreed ] = useState('');
  const [ size, setSize ] = useState('');

  const handleDogNameChange = text => {
    setDogName(text);
  }

  // const handleStateChange = text => {
  //   setState(text);
  // }

  // const handleCityChange = text => {
  //   setCity(text);
  // }

  const handleBreedChange = text => {
    setBreed(text);
  }

  const handleSizeChange = text => {
    setSize(text);
  }

  // const stateData = State.getStatesOfCountry('US');

  const breedData = [
    { key: '1', value: 'Mixed' },
    { key: '2', value: 'Shiba Inu' },
    { key: '3', value: 'Corgi' },
    { key: '4', value: 'German Shepherd' },
    { key: '5', value: 'Dachsund' }
  ]

  const sizeData = [
    { key: '1', value: 'Small'},
    { key: '2', value: 'Medium'},
    { key: '3', value: 'Large' }
  ]

  const nextPage = () => {
    const props = _.extend(route.params, { dog_name, location, breed, size });
    navigation.navigate('Sign Up 3', props)
  }

  const nextPageBtn = dog_name.length && location.length && breed.length && size.length ? (
    <Button title="Next" onPress={nextPage} />
  ) : (
    <Button title="Next" disabled />
  )

  return (
    <View>
      <Text>Tell us about your pup</Text>
      <TextInput value={dog_name} onChangeText={handleDogNameChange} placeholder="Name" />
      <Text>State</Text>
      {/* <SelectList
        setSelected={handleStateChange}
        data={cities}
        save="state"
      /> */}
      {/* <Text>City</Text>
      <SelectList
        setSelected={handleCityChange}
        data={cityData}
        save="name"
      /> */}
      <Text>Breed</Text>
      <SelectList
        setSelected={handleBreedChange}
        data={breedData}
        save="value"
      />
      <Text>Size</Text>
      <SelectList
        setSelected={handleSizeChange}
        data={sizeData}
        save="value"
      />
      {nextPageBtn}
    </View>
  )
}
