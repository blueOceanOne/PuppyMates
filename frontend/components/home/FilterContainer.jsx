import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { ListItem, Button, Badge, Icon } from '@rneui/themed';
const { useState } = React;
import userData from '../home/exampleData/userData.js';

// will look to access breed options in db
const breeds = userData.map((user) => user.breed);
const sizes = ['Small', 'Medium', 'Large'];
const energy = ['Low', 'Medium', 'High'];

const FilterContainer = ({ filter, setFilter }) => {
  const [expandSize, setExpandSize] = useState(false);
  const [expandEnergy, setExpandEnergy] = useState(false);
  const [expandBreed, setExpandBreed] = useState(false);
  const [expandFilter, setExpandFilter] = useState(false);
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const [selection, setSelection] = useState({});
  const [category, setCategory] = useState('');

  const handleSelection = (string) => {
    setDisplayConfirm(true);
    setSelection({ category: category, value: string });
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
        onPress={() => {
          setExpandFilter(!expandFilter);
        }}
      >
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: '600' }}>Breed</ListItem.Title>
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
            <ListItem key={breed} onPress={() => handleSelection(breed)} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>
                  {breed}
                  {breed === selection.value ? <Icon name="check" /> : null}
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
          isExpanded={expandSize}
          onPress={() => {
            setExpandSize(!expandSize);
            setCategory('Size');
          }}
          bottomDivider
        >
          {sizes.map((size) => (
            <ListItem key={size} onPress={() => handleSelection(size)} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>
                  {size}
                  {size === selection.value ? <Icon name="check" /> : null}
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
          onPress={() => {
            setExpandEnergy(!expandEnergy);
            setCategory('Energy');
          }}
          bottomDivider
        >
          {energy.map((level) => (
            <ListItem key={level} onPress={() => handleSelection(level)} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>
                  {level}
                  {level === selection.value ? <Icon name="check" /> : null}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </ListItem.Accordion>

        <ListItem
          onPress={() => {
            setCategory('Dog Friendly');
            handleSelection('Dog Friendly');
          }}
          bottomDivider
        >
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '600' }}>
              Dog Friendly
              {/* {'Dog Friendly' === selection.value ? <Icon name="check" /> : null} */}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem
          onPress={() => {
            setCategory('People Friendly');
            handleSelection('People Friendly');
          }}
          bottomDivider
        >
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '600' }}>
              People Friendly
              {/* {'People Friendly' === selection.value ? <Icon name="check" /> : null} */}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>
    </View>
  );
};

export default FilterContainer;
