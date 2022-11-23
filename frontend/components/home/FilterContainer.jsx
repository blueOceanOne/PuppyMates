import React from 'react';
import { View, Text } from 'react-native';
import { ListItem, Button, Badge } from '@rneui/themed';
const { useState } = React;
import userData from '../home/exampleData/userData.js';

// will look to access breed options in db
const breeds = userData.map((user) => user.breed);
const sizes = ['Small', 'Medium', 'Large'];
const energy = ['Low', 'Medium', 'High'];

const FilterContainer = ({ filter, setFilter }) => {
  const [expandSize, setExpandSize] = useState(false);
  const [expandBreed, setExpandBreed] = useState(false);
  const [expandFilter, setExpandFilter] = useState(false);
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const [choice, setChoice] = useState({});
  const [category, setCategory] = useState('');

  const handleChoice = (string) => {
    setDisplayConfirm(true);
    setChoice({ category: category, choice: string });
  };

  const handleConfirm = () => {
    // expected input
    // {"category": "Breed", "choice": "Corgi"}
    // send request to server based on input to render filter users
    // set expandFilter to false to close the accordion + update/reset relevant states
  };

  return (
    <View>
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>
                Filter By
                {category && expandFilter ? <Badge value={category} status="warning" /> : null}
              </ListItem.Title>
              {displayConfirm && expandFilter ? (
                <Button title="Confirm" onPress={() => handleConfirm()} />
              ) : null}
            </ListItem.Content>
          </>
        }
        isExpanded={expandFilter}
        onPress={() => {
          setExpandFilter(!expandFilter);
        }}
      >
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title>Breed</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expandBreed}
          onPress={() => {
            setExpandBreed(!expandBreed);
            setCategory('Breed');
          }}
          bottomDivider
        >
          {breeds.map((breed) => (
            <ListItem key={breed} onPress={() => handleChoice(breed)} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{breed}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </ListItem.Accordion>
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title>Size</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expandSize}
          onPress={() => {
            setExpandSize(!expandSize);
            setCategory('Size');
          }}
          bottomDivider
        >
          {sizes.map((size) => (
            <ListItem key={size} onPress={() => handleChoice(size)} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{size}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </ListItem.Accordion>
        {/* need to render this in badge too */}
        <ListItem
          onPress={() => {
            setCategory('Dog Friendly');
            handleChoice();
          }}
          bottomDivider
        >
          <ListItem.Content>
            <ListItem.Title>Dog Friendly</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem
          onPress={() => {
            setCategory('People Friendly');
            handleChoice('People Friendly');
          }}
          bottomDivider
        >
          <ListItem.Content>
            <ListItem.Title>People Friendly</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>
    </View>
  );
};

export default FilterContainer;
