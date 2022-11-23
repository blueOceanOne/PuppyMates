import React from 'react';
import { View, Text } from 'react-native';
const { useState } = React;
import FilterContainer from './FilterContainer.jsx';
import CarouselCards from './CarouselCards.jsx';

const HomeContainer = () => {
  //filter state - need to hide filter option when user clicks for more info
  const [filter, setFilter] = useState({});
  //user state -initial {id +  location}
  //local users -initial state = []
  const [localUsers, setLocalUsers] = useState([]);

  //useEffect - on load,  set get req to get all dogs from local area
  //create carousel component - images
  return (
    <View>
      <FilterContainer filter={filter} setFilter={setFilter} />
      <CarouselCards localUsers={localUsers} />
    </View>
  );
};

export default HomeContainer;
