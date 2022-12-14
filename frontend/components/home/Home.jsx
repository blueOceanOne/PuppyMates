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

  const id = 1;
  useEffect(() => {
    axios
      .get(`http://${config.localIP}:${config.port}/home?id=${id}`)
      .then((res) => {
        const users = res.data.slice(10);
        setLocalUsers(users);
      })
      .catch((err) => err);
  }, []);

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
      .catch((err) => err);
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
