import React from 'react';
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewProfile from './ViewProfile.jsx';
import EditProfile from './EditProfile.jsx';

const Stack = createNativeStackNavigator();

const Profile = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="View Profile"
        component={ViewProfile}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
      />
    </Stack.Navigator>
  )
}

export default Profile;
