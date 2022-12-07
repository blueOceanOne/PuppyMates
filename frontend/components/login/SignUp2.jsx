import React, { useState } from 'react';
import _ from 'underscore';
import { Text, View, TextInput, Button, SafeAreaView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import stateData from './states.js';

export default SignUp2 = ({ navigation, route }) => {
  const [ dog_name, setDogName ] = useState('');
  const [ state, setState ] = useState('');
  const [ city, setCity ] = useState('');
  const [ breed, setBreed ] = useState('');
  const [ size, setSize ] = useState('');
  const [ cityData, setCityData ] = useState([{ value: "Select a state first", disabled: true }])

  const handleStateChange = text => {
    setState(text);
    setCity('');
    setCityData(stateData.filter(city => city.value === text)[0].cities);
  }

  const breedData = [
    { key: '1', value: 'Mixed' },
    { key: '2', value: 'Shiba Inu' },
    { key: '3', value: 'Corgi' },
    { key: '4', value: 'German Shepherd' },
    { key: '5', value: 'Dachsund' }
  ]

  const sizeData = [
    { value: 'Extra Small'},
    { value: 'Small'},
    { value: 'Medium'},
    { value: 'Large' },
    { value: 'Extra Large' }
  ]

  const nextPage = () => {
    const props = _.extend(route.params, { dog_name, breed, size, state, city });
    navigation.navigate('Sign Up 3', props)
  }

  const nextPageBtn = dog_name.length && breed.length && size.length && state.length && city.length ? (
    <Button title="Next" onPress={nextPage} />
  ) : (
    <Button title="Next" disabled />
  )

  return (
    <SafeAreaView>
      <Text>Tell us about your pup</Text>
      <TextInput value={dog_name} onChangeText={setDogName} placeholder="Name" />
      <Text>State</Text>
      <SelectList
        setSelected={handleStateChange}
        data={stateData}
        save="value"
      />
      <Text>City</Text>
      <SelectList
        setSelected={setCity}
        data={cityData}
        save="value"
      />
      <Text>Breed</Text>
      <SelectList
        setSelected={e => setBreed(e.toUpperCase())}
        data={breedData}
        save="value"
      />
      <Text>Size</Text>
      <SelectList
        setSelected={e => setSize(e.toLowerCase())}
        data={sizeData}
        save="value"
      />
      {nextPageBtn}
    </SafeAreaView>
  )
}
