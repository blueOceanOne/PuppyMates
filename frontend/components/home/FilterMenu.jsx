import React from 'react';
import axios from 'axios';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import { ListItem, Button, Badge, Icon } from '@rneui/themed';
const { useState, useEffect } = React;
// import userData from '../home/exampleData/userData.js';
import config from '../../config.js';

const sizes = ['Extra Small', 'Small', 'Medium', 'Large', 'Extra Large'];
const energy = ['Low', 'Average', 'High'];

const FilterMenu = ({ filter, setFilter, handleFilter }) => {
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
      .catch((err) => console.log(err));
  }, []);

  const handleDisplayFilterMenu = () => {
    setExpandFilter(!expandFilter);
    if (!expandFilter) {
      setCategory('');
      setValue('');
      setDisplayConfirm(false);
    }
  };

  const handleDisplayFilterOptions = (filter, setFilter, category) => {
    if (filter) {
      setCategory('');
      setValue('');
      setFilter(false);
    } else {
      setFilter(true);
      setCategory(category);
    }
  };

  const handleFriendlyFilter = (type, value) => {
    if (category === type) {
      setCategory('');
      setValue('');
      setDisplayConfirm(false);
    } else {
      setCategory(type);
      setValue(value);
      setDisplayConfirm(true);
    }
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

  const handleConfirm = () => {
    handleFilter(category, value);
    setExpandFilter(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content style={styles.listItemContent}>
                <ListItem.Title>Filter By </ListItem.Title>
                {category && expandFilter ? <Badge value={category} status="warning" /> : null}
                {displayConfirm && expandFilter ? (
                  <Button
                    title="Confirm"
                    type="clear"
                    titleStyle={styles.confirmButton.titleStyle}
                    onPress={() => handleConfirm()}
                  />
                ) : null}
              </ListItem.Content>
            </>
          }
          isExpanded={expandFilter}
          onPress={() => handleDisplayFilterMenu()}
        >
          <ListItem
            onPress={() => handleFriendlyFilter('Dog Friendly', 'dog_friendly')}
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title style={styles.listItemTitle}>
                Dog Friendly
                {'Dog Friendly' === category ? <Icon name="check" /> : null}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem
            onPress={() => handleFriendlyFilter('People Friendly', 'people_friendly')}
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title style={styles.listItemTitle}>
                People Friendly
                {'People Friendly' === category ? <Icon name="check" /> : null}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem.Accordion
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={styles.listItemTitle}>Size</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expandSize}
            onPress={() => handleDisplayFilterOptions(expandSize, setExpandSize, 'size')}
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
                  <ListItem.Title style={styles.listItemTitle}>Energy</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expandEnergy}
            onPress={() => handleDisplayFilterOptions(expandEnergy, setExpandEnergy, 'energy')}
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
                  <ListItem.Title style={styles.listItemTitle}>Breed</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expandBreed}
            onPress={() => handleDisplayFilterOptions(expandBreed, setExpandBreed, 'breed')}
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

export default FilterMenu;

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
  },
  listItemTitle: {
    fontWeight: '600',
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  confirmButton: {
    titleStyle: {
      color: 'black',
      fontWeight: '500',
    },
  },
});
