import React from 'react'
import { Text } from 'react-native'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

const WishlistScreen = () => {
    const user = useSelector((state) => state.auth.user);

    console.log(user);
  return (
    <View>
        <Text style={{ fontSize: 48 }}>WishlistScreen</Text>
    </View>
  )
}

export default WishlistScreen