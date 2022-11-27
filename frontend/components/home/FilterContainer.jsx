import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { ListItem, Button, Badge, Icon } from '@rneui/themed';
const { useState } = React;
import userData from '../home/exampleData/userData.js';

// will look to access breed options in db
const breeds = userData.map((user) => user.breed);
const sizes = ['Small', 'Medium', 'Large'];
const energy = ['Low', 'Medium', 'High'];

const FilterContainer = ({ filter, setFilter, handleFilter }) => {
  const [expandSize, setExpandSize] = useState(false);
  const [expandEnergy, setExpandEnergy] = useState(false);
  const [expandBreed, setExpandBreed] = useState(false);
  const [expandFilter, setExpandFilter] = useState(false);
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const [selection, setSelection] = useState({});
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');

  const handleExpandFilter = () => {
    if (expandFilter) {
      setValue('');
      setCategory('');
      setExpandFilter(false);
    } else {
      setExpandFilter(true);
    }
  };

  const handleExpandBreed = () => {
    if (expandBreed) {
      setCategory('');
      setExpandBreed(false);
    } else {
      setExpandBreed(true);
      setCategory('breed');
    }
  };

  const handleExpandSize = () => {
    if (expandSize) {
      setCategory('');
      setExpandSize(false);
    } else {
      setExpandSize(true);
      setCategory('size');
    }
  };
  const handleExpandEnergy = () => {
    if (expandEnergy) {
      setCategory('');
      setExpandEnergy(false);
    } else {
      setExpandEnergy(true);
      setCategory('energy');
    }
  };

  const handleSelection = (string) => {
    setDisplayConfirm(true);
    setSelection({ category: category, value: string });
    console.log(selection);
  };

  const handleValue = (currVal) => {
    if (value === currVal) {
      setValue('');
      setDisplayConfirm(false);
    } else {
      setValue(currVal);
      setDisplayConfirm(true);
    }
  };

  const handleDogFriendly = () => {
    if (category === 'Dog Friendly') {
      setCategory('');
      setValue('');
      setDisplayConfirm(false);
    } else {
      setCategory('Dog Friendly');
      setValue('dog_friendly');
      setDisplayConfirm(true);
    }
  };
  const handlePeopleFriendly = () => {
    if (category === 'People Friendly') {
      setCategory('');
      setValue('');
      setDisplayConfirm(false);
    } else {
      setCategory('People Friendly');
      setValue('people_friendly');
      setDisplayConfirm(true);
    }
  };

  const handleConfirm = () => {
    //invoke handle func for get req in home page
    // filterCategory: "Breed", filterValue: "Corgi"}

    // set expandFilter to false to close the accordion + update/reset relevant states
    setExpandFilter(false);
  };

  return (
    <View style={{ flex: 0.5, zIndex: 2 }}>
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content flexDirection="row" alignItems="center" justifyContent="flex-start">
              <ListItem.Title>Filter By </ListItem.Title>
              {category && expandFilter ? <Badge value={category} status="warning" /> : null}
              {displayConfirm && expandFilter ? (
                <Button title="Confirm" type="clear" onPress={() => handleConfirm()} />
              ) : null}
            </ListItem.Content>
          </>
        }
        isExpanded={expandFilter}
        onPress={() => handleExpandFilter()}
      >
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: '600' }}>Breed</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={category === 'breed' ? true : false}
          onPress={() => handleExpandBreed()}
          bottomDivider
        >
          {breeds.map((breed) => (
            <ListItem key={breed} onPress={() => handleValue(breed)} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>
                  {breed}
                  {breed === value ? <Icon name="check" /> : null}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </ListItem.Accordion>
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: '600' }}>Size</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={category === 'size' ? true : false}
          onPress={() => handleExpandSize()}
          bottomDivider
        >
          {sizes.map((size) => (
            <ListItem key={size} onPress={() => handleValue(size)} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>
                  {size}
                  {size === value ? <Icon name="check" /> : null}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </ListItem.Accordion>
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: '600' }}>Energy</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={category === 'energy' ? true : false}
          onPress={() => handleExpandEnergy()}
          bottomDivider
        >
          {energy.map((level) => (
            <ListItem key={level} onPress={() => handleValue(level)} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>
                  {level}
                  {level === value ? <Icon name="check" /> : null}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </ListItem.Accordion>

        <ListItem onPress={() => handleDogFriendly()} bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '600' }}>
              Dog Friendly
              {'Dog Friendly' === category ? <Icon name="check" /> : null}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem onPress={() => handlePeopleFriendly()} bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '600' }}>
              People Friendly
              {'People Friendly' === category ? <Icon name="check" /> : null}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>
    </View>
  );
};

export default FilterContainer;
