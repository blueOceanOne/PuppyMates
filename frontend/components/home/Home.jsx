import React from 'react';
import { View, Text } from 'react-native';
const { useState } = React;
import FilterContainer from './FilterContainer.jsx';
import CarouselCards from './CarouselCards.jsx';

const Home = () => {
  const [filter, setFilter] = useState({});

  const [localUsers, setLocalUsers] = useState([]);

  return (
    <View>
      <FilterContainer filter={filter} setFilter={setFilter} />
      <CarouselCards localUsers={localUsers} />
    </View>
  );
};

export default Home;
