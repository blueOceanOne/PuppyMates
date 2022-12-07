import React from 'react';
import { View, Text, Alert, Button } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewProfile from './ViewProfile.jsx';
import EditProfile from './EditProfile.jsx';

const Stack = createNativeStackNavigator();

const Profile = ({ navigation }) => {
  const onLogOut = () => {
    navigation.navigate('Log In');
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="View Profile"
        options={{
          headerRight: () => (
            <Button
              onPress={onLogOut}
              title="Log Out"
              color="#FF0000"
            />
          )
        }}
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
