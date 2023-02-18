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
  const [expandFilter, setExpandFilter] = useState(false);
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const initialChoice = { category: '', value: '' };
  const [choice, setChoice] = useState(initialChoice);
  const [title, setTitle] = useState('');

  const handleDisplayFilterMenu = () => {
    if (expandFilter === false) {
      setExpandFilter(true);
      setChoice(initialChoice);
    } else {
      setChoice(initialChoice);
      setDisplayConfirm(false);
      setExpandFilter(false);
    }
  };

  const handleChoice = (category, value) => {
    setChoice({ category: category, value: value });
  };

  const handleCategory = (currCategory) => {
    if (choice.category === currCategory) {
      setChoice(initialChoice);
    } else {
      setChoice({ ...initialChoice, category: currCategory });
    }
  };

  const handleApply = () => {
    if (choice.category === 'friendliness') {
      handleFilter(choice.value, true);
      setChoice(initialChoice);
      setExpandFilter(false);
    } else {
      handleFilter(choice.category, choice.value);
      setChoice(initialChoice);
      setExpandFilter(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
      <ListItem.Accordion
        noIcon
        content={
          <>
            <ListItem.Content style={styles.listItemContent}>
              <ListItem.Title style={styles.listItemTitle}>Filter By </ListItem.Title>
              {choice.category && expandFilter ? (
                <Badge
                  value={choice.category}
                  status="warning"
                  badgeStyle={styles.badge.badgeContainer}
                  textStyle={styles.badge.badgeText}
                />
              ) : null}
            </ListItem.Content>
          </>
        }
        isExpanded={expandFilter}
        onPress={() => handleDisplayFilterMenu()}
        bottomDivider
      >
        {choice.category === 'friendliness' || choice.category === '' ? (
          <ListItem.Accordion
            noIcon
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={styles.listItemTitle}>Friendliness</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={choice.category === 'friendliness'}
            onPress={() => handleCategory('friendliness')}
            bottomDivider
          >
            {choice.category === 'friendliness'
              ? friendliness.map((option) => (
                  <ListItem
                    key={option.category}
                    onPress={() => handleChoice('friendliness', option.value)}
                    bottomDivider
                  >
                    <ListItem.CheckBox
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      checked={option.value === choice.value ? true : false}
                      checkedColor={checkedColor}
                      containerStyle={styles.checkBox}
                    />
                    <ListItem.Content>
                      <ListItem.Title style={styles.text}>{option.category}</ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                ))
              : null}
          </ListItem.Accordion>
        ) : null}

        {choice.category === 'size' || choice.category === '' ? (
          <ListItem.Accordion
            noIcon
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={styles.listItemTitle}>Size</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={choice.category === 'size'}
            onPress={() => handleCategory('size')}
            bottomDivider
            bottomDivider
          >
            {choice.category === 'size'
              ? sizes.map((size) => (
                  <ListItem key={size} onPress={() => handleChoice('size', size)} bottomDivider>
                    <ListItem.CheckBox
                      iconType="material-community"
                      checkedIcon="checkbox-marked"
                      uncheckedIcon="checkbox-blank-outline"
                      checked={size === choice.value ? true : false}
                      containerStyle={styles.checkBox}
                      checkedColor={checkedColor}
                    />
                    <ListItem.Content>
                      <ListItem.Title style={styles.text}>{size}</ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                ))
              : null}
          </ListItem.Accordion>
        ) : null}
        {choice.category === 'energy' || choice.category === '' ? (
          <ListItem.Accordion
            noIcon
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={styles.listItemTitle}>Energy</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={choice.category === 'energy'}
            onPress={() => handleCategory('energy')}
            bottomDivider
          >
            {choice.category === 'energy'
              ? energy.map((level) => (
                  <ListItem key={level} onPress={() => handleChoice('energy', level)} bottomDivider>
                    <ListItem.CheckBox
                      iconType="material-community"
                      checkedIcon="checkbox-marked"
                      uncheckedIcon="checkbox-blank-outline"
                      checked={level === choice.value ? true : false}
                      containerStyle={styles.checkBox}
                      checkedColor={checkedColor}
                    />
                    <ListItem.Content>
                      <ListItem.Title style={styles.text}>{level}</ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                ))
              : null}
          </ListItem.Accordion>
        ) : null}

        {choice.category === 'breed' || choice.category === '' ? (
          <ListItem.Accordion
            noIcon
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={styles.listItemTitle}>Breed</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={choice.category === 'breed'}
            onPress={() => handleCategory('breed')}
            bottomDivider
          >
            {choice.category === 'breed'
              ? breeds.map((breed) => (
                  <ListItem
                    key={`${breed} + type`}
                    onPress={() => handleChoice('breed', breed)}
                    bottomDivider
                  >
                    <ListItem.CheckBox
                      iconType="material-community"
                      checkedIcon="checkbox-marked"
                      uncheckedIcon="checkbox-blank-outline"
                      checked={breed === choice.value ? true : false}
                      containerStyle={styles.checkBox}
                      checkedColor={checkedColor}
                    />
                    <ListItem.Content>
                      <ListItem.Title style={styles.text}>{breed}</ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                ))
              : null}
          </ListItem.Accordion>
        ) : null}
      </ListItem.Accordion>
      {/* </ScrollView> */}

      {expandFilter ? (
        <View style={styles.buttonContainer}>
          {choice.category === '' ? (
            <View style={styles.buttonContainer}>
              <Button
                title="Close"
                size="xs"
                type="solid"
                titleStyle={styles.confirmButton.titleStyle}
                buttonStyle={styles.confirmButton.buttonStyle}
                activeOpacity={0.8}
                onPress={() => handleDisplayFilterMenu()}
              />
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <Button
                title="Clear"
                size="xs"
                type="clear"
                titleStyle={styles.cancelButton.titleStyle}
                buttonStyle={styles.cancelButton.buttonStyle}
                activeOpacity={2}
                onPress={() => setChoice(initialChoice)}
              />
              <Button
                title="Confirm"
                size="xs"
                type="solid"
                titleStyle={styles.confirmButton.titleStyle}
                buttonStyle={styles.confirmButton.buttonStyle}
                activeOpacity={0.5}
                onPress={() => handleApply()}
              />
            </View>
          )}
        </View>
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
  accordion: {
    width: '100%',
    borderRadius: 25,
  },
  listItemTitle: {
    fontWeight: 'bold',
    justifySelf: 'space-between',
  },
  text: {
    textTransform: 'capitalize',
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 5,
  },
  confirmButton: {
    titleStyle: {
      color: 'white',
      fontSize: 18,
    },
    buttonStyle: {
      backgroundColor: '#F49D1A',
      borderRadius: 5,
      marginLeft: 10,
      paddingHorizontal: 10,
    },
  },
  cancelButton: {
    titleStyle: {
      color: '#202124',
    },
    buttonStyle: {
      marginRight: 10,
      paddingHorizontal: 10,
    },
  },
  badge: {
    badgeText: {
      color: 'black',
      // fontWeight: 'bold',
      fontSize: 15,
      textTransform: 'capitalize',
    },
    badgeContainer: {
      paddingHorizontal: 10,
      height: 25,
      backgroundColor: '#FFD8A9',
      // alignItems: 'center',
    },
  },
  checkBox: {
    right: 20,
    position: 'absolute',
  },
});
