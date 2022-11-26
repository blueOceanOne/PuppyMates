import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
const { useState } = React;
import FilterContainer from './FilterContainer.jsx';
import CarouselCards from './CarouselCards.jsx';

const Home = () => {
  const [filter, setFilter] = useState({});

  const [localUsers, setLocalUsers] = useState([]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FilterContainer filter={filter} setFilter={setFilter} />
      <CarouselCards localUsers={localUsers} />
    </SafeAreaView>
  );
};

export default Home;
