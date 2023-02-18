import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import axios from 'axios';
import FilterMenu from './FilterMenu.jsx';
import CarouselCards from './CarouselCards.jsx';
import config from '../../config.js';
const { useState, useEffect } = React;

const Home = () => {
  const [id, setId] = useState(1);
  const initialFilter = { filterCategory: '', filterValue: '' };
  const [filter, setFilter] = useState(initialFilter);
  const [localUsers, setLocalUsers] = useState([]);
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    axios
      .get(`http://${config.localIP}:${config.port}/home?id=${id}`)
      .then((res) => {
        const users = res.data.slice(10);
        const currBreeds = [];
        users.map((user) => {
          if (currBreeds.indexOf(user.breed.breed) === -1) {
            currBreeds.push(user.breed.breed);
          }
        });
        currBreeds.sort((a, b) => a.localeCompare(b));

        setLocalUsers(users);
        setBreeds(currBreeds);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleFilter = (currCategory, currVal) => {
    console.log('currCategory and val', currCategory, currVal);
    axios
      .get(
        `http://${config.localIP}:${config.port}/home?id=${id}&filterCategory=${currCategory}&filterValue=${currVal}`
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
    <SafeAreaView style={styles.homeContainer}>
      <FilterMenu
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

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
