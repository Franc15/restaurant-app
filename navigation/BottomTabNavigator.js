import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo/vector-icons

import HomeScreen from '../src/screens/HomeScreen';
import ResultsShowScreen from '../src/screens/ResultsShowScreen';
import SearchScreen from '../src/screens/SearchScreen';
import LocationScreen from '../src/screens/LocationScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Resto') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Location') {
            iconName = focused ? 'location' : 'location-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarStyle={{
        backgroundColor: 'white', // Customize tab bar background color
      }}
      tabBarItemStyle={{
        paddingVertical: 10, // Customize individual tab item style
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Resto" component={ResultsShowScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Location" component={LocationScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
