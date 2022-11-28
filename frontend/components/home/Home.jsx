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
  const id = 100;
  useEffect(() => {
    axios
      .get(`http://${config.localIP}:${config.port}/home?id=${id}`)
      .then((res) => {
        const users = res.data;
        // users.reverse();
        setLocalUsers(users);
      })
      .catch((err) => console.log(err));
  }, [id]);

  //HANDLE FILTER FUNCTION
  const handleFilter = (currCategory, currVal) => {
    const val = currVal.toLowerCase();

    axios
      .get(
        `http://${config.localIP}:${config.port}/home?id=${id}&filterCategory=${currCategory}&filterValue=${val}`
      )
      .then((res) => {
        const filterUsers = res.data;
        filterUsers.reverse();
        setLocalUsers(filterUsers);
        setFilter(initialFilter);
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <FilterContainer
        filter={filter}
        setFilter={setFilter}
        handleFilter={handleFilter}
        breeds={breeds}
      />
      <CarouselCards localUsers={localUsers} setLocalUsers={setLocalUsers} id={id} />
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
