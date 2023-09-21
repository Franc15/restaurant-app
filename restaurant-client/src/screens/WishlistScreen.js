import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import foodieApi from "../api/app";
import { withNavigationFocus } from 'react-navigation'; // Import withNavigationFocus

// Create a new component to display wishlist items
const WishlistItem = ({ item, navigation }) => (
  <TouchableOpacity
    style={styles.itemContainer}
    onPress={() => navigation.navigate("ResultsShow", { id: item.restaurant_id })}
  >
    <Image style={styles.image} source={{ uri: item.restaurant_image }} />
    <View style={styles.textContainer}>
      <Text style={styles.restaurantName}>{item.restaurant_name}</Text>
      <Text style={styles.rating}>
        {item.restaurant_rating} Stars, {item.restaurant_review_count} Reviews
      </Text>
      <Text style={styles.location}>
        {item.restaurant_city}, {item.restaurant_location1}
      </Text>
      {/* Add more information here */}
    </View>
  </TouchableOpacity>
);

const WishlistScreen = ({ navigation, isFocused }) => {
  const user = useSelector((state) => state.auth.user);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = () => {
    if (user && isFocused) {
      // Fetch the user's wishlist from your MongoDB API when the screen is focused
      foodieApi
        .get(`/wishlist/${user.email}`)
        .then((response) => {
          setWishlist(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching wishlist:', error);
          setLoading(false);
        });
    }
  };

  // Use the useEffect hook to refresh data when the screen is focused
  useEffect(() => {
    fetchWishlist();
  }, [user, isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Wishlist</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : wishlist.length === 0 ? (
        <Text>Your wishlist is empty.</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.restaurant_id}
          renderItem={({ item }) => <WishlistItem item={item} navigation={navigation} />} // Render WishlistItem for each item
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    borderRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rating: {
    color: 'gray',
  },
  location: {
    color: 'gray',
  },
});

export default withNavigationFocus(WishlistScreen);
