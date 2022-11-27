import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import axios from 'axios';
import FilterContainer from './FilterContainer.jsx';
import CarouselCards from './CarouselCards.jsx';
import config from '../../config.js';
//prop to be passed in to get current user's id
const { useState, useEffect } = React;
const Home = () => {
  // const Home = ({id}) => {
  const initialFilter = { filterCategory: '', filterValue: '' };
  const [filter, setFilter] = useState(initialFilter);
  const [localUsers, setLocalUsers] = useState([]);
  const [breeds, setBreeds] = useState([]);

  //SINGLE USERS
  // axios.get(`http://${config.localIP}:${config.port}/users`);

  //LOCAL USERS
  // const id = 1;
  // useEffect(() => {
  //   axios
  //     .get(`http://${config.localIP}:${config.port}/home?id=${id}`)
  //     .then((data) => {
  //       console.log(data, 'data');
  //       setLocalUsers(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  useEffect(() => {
    axios
      .get(`http://${config.localIP}:${config.port}/breeds`)
      .then((res) => {
        // console.log(res.data, 'breed');
        const breedList = res.data;
        breedList.sort((a, b) => a.breed.localeCompare(b.breed));
        const breedNames = breedList.map((breed) => breed.breed);
        setBreeds(breedNames);
      })
      .catch((err) => console.log(err));
  }, []);

  //HANDLE FILTER FUNCTION
  const handleFilter = () => {
    console.log('handle filter');
    //   axios
    //     .get(
    //       `http://${config.localIP}:${config.port}/home?id=${id}&filterCategory=${filter.filterCategory}&filterValue=${filter.filterValue}`
    //     )
    //     .then((data) => {
    //       setLocalUsers(data);
    //       setFilter(initialFilter
    //     })
    //     .catch((err) => res.send(err));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FilterContainer
        filter={filter}
        setFilter={setFilter}
        handleFilter={handleFilter}
        breeds={breeds}
      />
      <CarouselCards localUsers={localUsers} />
    </SafeAreaView>
  );
};

export default Home;

// const filters = [
//   {
//   category: 'breed',
//   badge: 'Breed',
//   values: [breeds],
//   isExpanded: 'expandBreed',
//   onPress: 'setExpandBreed(!expandBreed)'
//   },
//   {
//     category: 'size',
//     badge: 'Size',
//     values: ['Small', 'Medium', 'Large'],
//     isExpanded: 'expandSize',
//     onPress: 'setExpandSize(!expandSize)'
//   },
//   {
//     category: 'energy',
//     badge: 'Energy',
//     values: ['Low', 'Medium', 'High'],
//     isExpanded: 'expandEnergy',
//     onPress: 'setExpandEnergy(!expandEnergy)'
//   },
//   {
//     category: 'dog_friendly',
//     badge: 'Dog Friendly',
//     values: 'Dog Friendly',
//     onPress: 'setExpandBreed(!expandBreed)'
//   },
//   {
//     category: 'people_friendly',
//     badge: 'People Friendly',
//     values: 'People Friendly'

//   }
// ]
