import React, { useState } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import _ from 'underscore';

export default SignUp4 = ({ navigation, route }) => {
  const [ dog_friendly, setDogFriendly ] = useState(null);
  const [ people_friendly, setPeopleFriendly ] = useState(null);
  const [ energy, setEnergy ] = useState(null);

  const handleDogFriendlyChange = e => {
    setDogFriendly(e.value);
  }

  const handlePeopleFriendlyChange = e => {
    setPeopleFriendly(e.value);
  }

  const handleEnergyChange = text => {
    setEnergy(text.toLowerCase());
  }

  const nextPage = () => {
    const props = _.extend(route.params, { dog_friendly, people_friendly, energy });
    navigation.navigate('Sign Up 5', props)
  }

  const nextPageBtn = dog_friendly !== null && people_friendly !== null && energy ? (
    <Button title="Next" onPress={nextPage} />
  ) : (
    <Button title="Next" disabled />
  )

  const friendlyData = [
    {
      label: 'Yes',
      value: true
    },
    {
      label: 'No',
      value: false
    }
  ]

  const energyData = [
    { value: 'Low' },
    { value: 'Average' },
    { value: 'High' }
  ]

  return (
    <SafeAreaView>
      <Text>Tell us about your pup</Text>
      <Text>Is your pup dog-friendly?</Text>
      <RadioButtonRN
        data={friendlyData}
        selectedBtn={handleDogFriendlyChange}
      />
      <Text>Is your pup people-friendly?</Text>
      <RadioButtonRN
        data={friendlyData}
        selectedBtn={handlePeopleFriendlyChange}
      />
      <Text>What's your pup's energy level?</Text>
      <SelectList
        data={energyData}
        save="value"
        setSelected={handleEnergyChange}
      />
      {nextPageBtn}
    </SafeAreaView>
  )
}
