import { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';
import FilterMenu from './FilterMenu.jsx';
import CarouselCards from './CarouselCards.jsx';
import config from '../../config.js';

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
        const users = res.data;
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
    <SafeAreaView style={styles.container}>
      <View style={styles.filterMenuContainer}>
        <FilterMenu
          filter={filter}
          setFilter={setFilter}
          handleFilter={handleFilter}
          breeds={breeds}
        />
      </View>
      <View style={styles.carouselCardContainer}>
        <CarouselCards localUsers={localUsers} setLocalUsers={setLocalUsers} id={id} />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  filterMenuContainer: {
    flex: 1,
    zIndex: 1,
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  carouselCardContainer: {
    flex: 9,
  },
});
