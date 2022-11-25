import React, { useState } from 'react';

const GuestCard = ({user}) => {
  const [selected, setSelected] = useState(false);

  const handleSelected = () => {
    setSelected(!selected);
    console.log(`${user.username} selected: ${selected}`);
  }
  return (
    <ListItem key={each.id}>
      <Pressable onPress={() => {console.log(each.id)}}>
      <Avatar source={{uri: each.photos[0]}} />
        <ListItem.Title>
          {each['dog_name']}
        </ListItem.Title>
        <Text>
          {each.username}
        </Text>
      </Pressable>
    </ListItem>
  )
}

export default GuestCard;