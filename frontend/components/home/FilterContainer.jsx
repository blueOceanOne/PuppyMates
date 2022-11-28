import React from 'react';
import axios from 'axios';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { ListItem, Button, Badge, Icon } from '@rneui/themed';
const { useState, useEffect } = React;
import userData from '../home/exampleData/userData.js';
import config from '../../config.js';

const sizes = ['Extra Small', 'Small', 'Medium', 'Large', 'Extra Large'];
const energy = ['Low', 'Average', 'High'];

const FilterContainer = ({ filter, setFilter, handleFilter }) => {
  const [expandSize, setExpandSize] = useState(false);
  const [expandEnergy, setExpandEnergy] = useState(false);
  const [expandBreed, setExpandBreed] = useState(false);
  const [expandFilter, setExpandFilter] = useState(false);
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    axios
      .get(`http://${config.localIP}:${config.port}/breeds`)
      .then((res) => {
        const breedList = res.data;
        breedList.sort((a, b) => a.breed.localeCompare(b.breed));
        const breedNames = breedList.map((breed) => breed.breed);
        setBreeds(breedNames);
      })
      .catch((err) => err);
  }, []);

  const handleExpandFilter = () => {
    setExpandFilter(!expandFilter);
    if (!expandFilter) {
      setCategory('');
      setValue('');
      setDisplayConfirm(false);
    }
  };

  const handleExpandBreed = () => {
    if (expandBreed) {
      setCategory('');
      setValue('');
      setExpandBreed(false);
    } else {
      setExpandBreed(true);
      setCategory('breed');
    }
  };

  const handleExpandSize = () => {
    if (expandSize) {
      setCategory('');
      setValue('');
      setExpandSize(false);
    } else {
      setExpandSize(true);
      setCategory('size');
    }
  };
  const handleExpandEnergy = () => {
    if (expandEnergy) {
      setCategory('');
      setValue('');
      setExpandEnergy(false);
    } else {
      setExpandEnergy(true);
      setCategory('energy');
    }
  };

  const handleSelection = () => {
    setDisplayConfirm(true);
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
    handleFilter(category, value);
    setExpandFilter(false);
  };

  return (
    <View style={{ zIndex: 3 }}>
      <ScrollView>
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <ListItem.Title>Filter By </ListItem.Title>
                {category && expandFilter ? <Badge value={category} status="warning" /> : null}
                {displayConfirm && expandFilter ? (
                  <Button
                    title="Confirm"
                    type="clear"
                    titleStyle={{ color: 'black', fontWeight: '500' }}
                    onPress={() => handleConfirm()}
                  />
                ) : null}
              </ListItem.Content>
            </>
          }
          isExpanded={expandFilter}
          onPress={() => handleExpandFilter()}
        >
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
          <ListItem.Accordion
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={{ fontWeight: '600' }}>Size</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expandSize}
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
            isExpanded={expandEnergy}
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

          <ListItem.Accordion
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={{ fontWeight: '600' }}>Breed</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expandBreed}
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
        </ListItem.Accordion>
      </ScrollView>
    </View>
  );
};

export default FilterContainer;
