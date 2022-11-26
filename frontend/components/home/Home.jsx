import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
const { useState } = React;
import FilterContainer from './FilterContainer.jsx';
import CarouselCards from './CarouselCards.jsx';
//prop to be passed in to get current user's id
const Home = () => {
  const [filter, setFilter] = useState({});
  const [localUsers, setLocalUsers] = useState([]);

  //useEffect to render users on load and set to setLocalUsers state

  //create handleFilter func to send get request

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FilterContainer filter={filter} setFilter={setFilter} />
      <CarouselCards localUsers={localUsers} />
    </SafeAreaView>
  );
};

export default Home;
