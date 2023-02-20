import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ListItem, Button, Badge } from '@rneui/themed';
import FilterCategory from './FilterCategory.jsx';

const sizes = ['extra small', 'small', 'medium', 'large', 'extra large'];
const energy = ['low', 'average', 'high'];
const friendliness = [
  { category: 'dog friendly', value: 'dog_friendly' },
  { category: 'people friendly', value: 'people_friendly' },
];

const FilterMenu = ({ filter, setFilter, handleFilter, breeds }) => {
  const [expandMenu, setExpandMenu] = useState(false);
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const initialChoice = { category: '', value: '' };
  const [choice, setChoice] = useState(initialChoice);
  const [title, setTitle] = useState('');

  const handleDisplayFilterMenu = () => {
    if (expandMenu) {
      setChoice(initialChoice);
      setDisplayConfirm(false);
    }
    setExpandMenu(!expandMenu);
  };

  const handleChoice = (category, value) => {
    setChoice({ category, value });
  };

  const handleCategory = (category) => {
    if (choice.category === category) {
      setChoice(initialChoice);
    } else {
      setChoice({ ...initialChoice, category });
    }
  };

  const handleApply = () => {
    if (choice.category === 'friendliness') {
      handleFilter(choice.value, true);
      setChoice(initialChoice);
      setExpandMenu(false);
    } else {
      handleFilter(choice.category, choice.value);
      setChoice(initialChoice);
      setExpandMenu(false);
    }
  };

  return (
    <>
      <ListItem.Accordion
        noIcon
        content={
          <>
            <ListItem.Content style={styles.listItemContent}>
              <ListItem.Title style={styles.listItemTitle}>Filter By </ListItem.Title>
              {choice.category && expandMenu ? (
                <Badge
                  value={choice.category}
                  badgeStyle={styles.badge.badgeContainer}
                  textStyle={styles.badge.badgeText}
                />
              ) : null}
            </ListItem.Content>
          </>
        }
        isExpanded={expandMenu}
        onPress={() => handleDisplayFilterMenu()}
      >
        <ScrollView style={{ maxHeight: 300 }}>
          {choice.category === 'friendliness' || choice.category === '' ? (
            <FilterCategory
              title="Friendliness"
              category="friendliness"
              choice={choice}
              handleCategory={handleCategory}
              handleChoice={handleChoice}
              items={friendliness}
            />
          ) : null}
          {choice.category === 'size' || choice.category === '' ? (
            <FilterCategory
              title="Size"
              category="size"
              choice={choice}
              handleCategory={handleCategory}
              handleChoice={handleChoice}
              items={sizes}
            />
          ) : null}
          {choice.category === 'energy' || choice.category === '' ? (
            <FilterCategory
              title="Energy"
              category="energy"
              choice={choice}
              handleCategory={handleCategory}
              handleChoice={handleChoice}
              items={energy}
            />
          ) : null}
          {choice.category === 'breed' || choice.category === '' ? (
            <FilterCategory
              title="Breed"
              category="breed"
              choice={choice}
              handleCategory={handleCategory}
              handleChoice={handleChoice}
              items={breeds}
            />
          ) : null}
        </ScrollView>
      </ListItem.Accordion>

      {expandMenu ? (
        <View style={styles.buttonContainer}>
          {choice.category === '' ? (
            <View style={styles.buttonContainer}>
              <Button
                title="Close"
                size="sm"
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
                title={<Text style={{ textDecorationLine: 'underline' }}>Clear</Text>}
                size="sm"
                type="clear"
                titleStyle={styles.cancelButton.titleStyle}
                buttonStyle={styles.cancelButton.buttonStyle}
                activeOpacity={2}
                onPress={() => setChoice(initialChoice)}
              />
              <Button
                title="Confirm"
                size="sm"
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
    </>
  );
};

export default FilterMenu;

const styles = StyleSheet.create({
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemTitle: {
    fontWeight: 'bold',
    justifySelf: 'space-between',
  },
  badge: {
    badgeText: {
      color: 'black',
      fontSize: 15,
      textTransform: 'capitalize',
    },
    badgeContainer: {
      paddingHorizontal: 10,
      height: 25,
      backgroundColor: '#FFD8A9',
    },
  },
  buttonContainer: {
    flexDirection: 'row',
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
      textDecoration: 'underline',
    },
    buttonStyle: {
      marginRight: 10,
      paddingTop: 10,
    },
  },
});
