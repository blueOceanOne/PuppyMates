import React from 'react';
import axios from 'axios';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import { ListItem, Button, Badge, Icon } from '@rneui/themed';
const { useState, useEffect } = React;
// import userData from '../home/exampleData/userData.js';
import config from '../../config.js';

const sizes = ['extra small', 'small', 'medium', 'large', 'extra large'];
const energy = ['low', 'average', 'high'];
const friendliness = [
  { category: 'dog friendly', value: 'dog_friendly' },
  { category: 'people friendly', value: 'people_friendly' },
];
const checkedColor = '#F49D1A';

const FilterMenu = ({ filter, setFilter, handleFilter, breeds }) => {
  const [expandSize, setExpandSize] = useState(false);
  const [expandEnergy, setExpandEnergy] = useState(false);
  const [expandBreed, setExpandBreed] = useState(false);
  const [expandFilter, setExpandFilter] = useState(false);
  const [expandFriendliness, setExpandFriendliness] = useState(false);
  const [displayApply, setDisplayApply] = useState(false);
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  // const [breeds, setBreeds] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`http://${config.localIP}:${config.port}/breeds`)
  //     .then((res) => {
  //       const breedList = res.data;
  //       breedList.sort((a, b) => a.breed.localeCompare(b.breed));
  //       const breedNames = breedList.map((breed) => breed.breed);
  //       setBreeds(breedNames);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const handleDisplayFilterMenu = () => {
    setExpandFilter(!expandFilter);
    if (!expandFilter) {
      setCategory('');
      setValue('');
      setDisplayApply(false);
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
      setDisplayApply(false);
    } else {
      setCategory(type);
      setValue(value);
      setDisplayApply(true);
    }
  };

  const handleValue = (currVal) => {
    if (value === currVal) {
      setValue('');
      setDisplayApply(false);
    } else {
      setValue(currVal);
      setDisplayApply(true);
    }
  };

  const handleApply = (currCategory) => {
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
                <ListItem.Title style={styles.listItemTitle}>Filter By </ListItem.Title>
                {category && expandFilter ? (
                  <Badge
                    value={category}
                    status="warning"
                    badgeStyle={styles.badge.badgeContainer}
                    textStyle={styles.badge.badgeText}
                  />
                ) : null}
                {/* {displayApply && expandFilter ? (
                  <Button
                    title="Apply"
                    type="solid"
                    titleStyle={styles.applyButton.titleStyle}
                    buttonStyle={styles.applyButton.buttonStyle}
                    onPress={() => handleApply()}
                  />
                ) : null} */}
              </ListItem.Content>
            </>
          }
          isExpanded={expandFilter}
          onPress={() => handleDisplayFilterMenu()}
        >
          <ListItem.Accordion
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={styles.listItemTitle}>Friendliness</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expandFriendliness}
            onPress={() =>
              handleDisplayFilterOptions(expandFriendliness, setExpandFriendliness, 'friendliness')
            }
            bottomDivider
          >
            {friendliness.map((option) => (
              <ListItem
                key={option.category}
                onPress={() => handleValue(option.value)}
                bottomDivider
              >
                <ListItem.CheckBox
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  checked={option.value === value ? true : false}
                  containerStyle={styles.checkBox.container}
                  checkedColor={checkedColor}
                />
                <ListItem.Content>
                  <ListItem.Title>{option.category}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </ListItem.Accordion>

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
                <ListItem.CheckBox
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  checked={size === value ? true : false}
                  containerStyle={styles.checkBox.container}
                  checkedColor={checkedColor}
                />
                <ListItem.Content>
                  <ListItem.Title>{size}</ListItem.Title>
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
                <ListItem.CheckBox
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  checked={level === value ? true : false}
                  containerStyle={styles.checkBox.container}
                  checkedColor={checkedColor}
                />
                <ListItem.Content>
                  <ListItem.Title>{level}</ListItem.Title>
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
              <ListItem key={`${breed} + type`} onPress={() => handleValue(breed)} bottomDivider>
                <ListItem.CheckBox
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  checked={breed === value ? true : false}
                  containerStyle={styles.checkBox.container}
                  textStyle={{ textTransform: 'uppercase' }}
                  checkedColor={checkedColor}
                />
                <ListItem.Content>
                  <ListItem.Title>{breed}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </ListItem.Accordion>
        </ListItem.Accordion>
      </ScrollView>
      {displayApply && expandFilter ? (
        <Button
          title="Apply"
          type="outline"
          titleStyle={styles.applyButton.titleStyle}
          buttonStyle={styles.applyButton.buttonStyle}
          onPress={() => handleApply()}
        />
      ) : null}
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
    fontWeight: 'bold',
    justifySelf: 'space-between',
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  applyButton: {
    titleStyle: {
      color: 'black',
      fontWeight: 'bold',
    },
    buttonStyle: {
      backgroundColor: '#FFE15D',
    },
  },
  badge: {
    badgeText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 15,
      textTransform: 'capitalize',
    },
    badgeContainer: {
      paddingHorizontal: 10,
      justifyContent: 'center',
      height: 25,
      // alignItems: 'center',
    },
  },
  checkBox: {
    container: {
      position: 'absolute',
      right: 10,
    },
  },
});
