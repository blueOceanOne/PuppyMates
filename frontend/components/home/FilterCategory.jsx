import React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import { ListItem } from '@rneui/themed';
const { useState, useEffect } = React;
const checkedColor = '#F49D1A';

const FilterCategory = ({ title, category, choice, handleCategory, handleChoice, items }) => {
  return (
    <ListItem.Accordion
      noIcon
      content={
        <>
          <ListItem.Content>
            <ListItem.Title style={styles.listItemTitle}>{title}</ListItem.Title>
          </ListItem.Content>
        </>
      }
      isExpanded={choice.category === category}
      onPress={() => handleCategory(category)}
      bottomDivider
    >
      {choice.category !== 'friendliness'
        ? items.map((item) => (
            <ListItem key={item} onPress={() => handleChoice(category, item)} bottomDivider>
              <ListItem.CheckBox
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={item === choice.value}
                checkedColor={checkedColor}
                containerStyle={styles.checkBox}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.text}>{item}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))
        : items.map((item) => (
            <ListItem
              key={item.category}
              onPress={() => handleChoice(category, item.value)}
              bottomDivider
            >
              <ListItem.CheckBox
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={item.value === choice.value}
                checkedColor={checkedColor}
                containerStyle={styles.checkBox}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.text}>{item.category}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
    </ListItem.Accordion>
  );
};

export default FilterCategory;

const styles = StyleSheet.create({
  listItemTitle: {
    fontWeight: '500',
    justifySelf: 'space-between',
  },
  checkBox: {
    right: 20,
    position: 'absolute',
  },
  text: {
    textTransform: 'capitalize',
  },
});
