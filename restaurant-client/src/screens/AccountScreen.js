import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const  AccountScreen = () => {
  const userData = useSelector((state) => state.auth.user);
  // const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   // Retrieve user data from AsyncStorage
  //   const getUserData = async () => {
  //     try {
  //       const userDataString = await AsyncStorage.getItem('userData');
  //       if (userDataString) {
  //         const parsedUserData = JSON.parse(userDataString);
  //         setUserData(parsedUserData);
  //       }
  //     } catch (error) {
  //       console.error('Error retrieving user data:', error);
  //     }
  //   };

  //   getUserData();
  // }, []);

  return (
    <SafeAreaView>
      {userData ? (
        <View>
          <Text>User ID: {userData.userId}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Name: {userData.name}</Text>
          
        </View>
      ) : (
        <Text>Loading user data...</Text>
      )}
    </SafeAreaView>
  );
}

export default AccountScreen;
