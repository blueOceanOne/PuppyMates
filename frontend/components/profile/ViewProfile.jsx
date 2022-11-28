import React from 'react';
import { View, Text, Button, Image } from 'react-native';

export default ViewProfile = ({ navigation }) => {
  const exampleProfile = {
    "bio": "Bio ",
    "breed": "DACHSUND",
    "city": "Peoria",
    "dog_friendly": true,
    "dog_name": "Lucy",
    "user_email": "avarice.boonzaayer@gmail.coma",
    "energy": "low",
    "password": "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
    "people_friendly": true,
    "photos": [
      "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Ffrontend-52647eb6-932d-415c-b6f5-a7e52f5f9912/ImagePicker/73c041e6-f3af-4236-9a5b-3eabcfe1a428.jpeg"
    ],
    "size": "small",
    "state": "AZ",
    "under18": true
  }

  return (
    <View>
      <Button title="Log Out" />
      <Image style={{ width: 100, height: 100 }} source={exampleProfile.photos[0]} />
      <Text>{exampleProfile.dog_name}</Text>
      <View>
        <Text>{`${exampleProfile.city}, ${exampleProfile.state}`}</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text>{` ${exampleProfile.breed[0] + exampleProfile.breed.slice(1).toLowerCase()} `}</Text>
          <Text>{` ${exampleProfile.size[0].toUpperCase() + exampleProfile.size.slice(1)} `}</Text>
          {exampleProfile.dog_friendly ? (
            <Text> Dog-Friendly </Text>
          ) : null}
          {exampleProfile.people_friendly ? (
            <Text> People-Friendly </Text>
          ) : null}
          <Text>{` ${exampleProfile.energy[0].toUpperCase() + exampleProfile.energy.slice(1)} energy `}</Text>
        </View>
        <Text>{exampleProfile.bio}</Text>
      </View>
      <Button title="Edit Profile" />
    </View>
  )
}
