import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import yelp from "../api/yelp";

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState(false);
  const id = navigation.getParam('id');

  const getResult = async id => {
    try {
      const response = await yelp.get(`/${id}`);
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error loading data. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResult(id);
  }, []);

  const toggleWishlist = async () => {
    try {
      if (wishlist) {
        // If it's in the wishlist, remove it
        const response = await fetch(`/wishlists/remove/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        console.log(data); // Handle the response data as needed
      } else {
        // If it's not in the wishlist, add it
        const response = await fetch("/wishlists/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            restaurant_id: id,
          }),
        });
        const data = await response.json();
        console.log(data); // Handle the response data as needed
      }

      // Toggle the wishlist state based on the response
      setWishlist(!wishlist);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    );
  }

  if (!result) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>No data available for this location.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.background}>
      <View style={styles.container}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={result.photos}
          keyExtractor={photo => photo}
          renderItem={({ item }) => (
            <Image style={styles.image} source={{ uri: item }} />
          )}
        />

        <TouchableOpacity  style={styles.wishlistIcon}>
          <FontAwesome name={wishlist ? "heart" : "heart-o"} size={24} color={wishlist ? "red" : "black"} />
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{result.name}</Text>
          <Text style={styles.contact}>Contact: {result.phone}</Text>
          <Text style={styles.rating}>Rating: {result.rating}</Text>
          <Text style={styles.reviewCount}>Total Reviews: {result.review_count}</Text>
          <Text style={styles.country}>Country: {result.location.country}</Text>
          <Text style={styles.city}>City: {result.location.city}</Text>
          <Text style={styles.address}>Location: {result.location.address1}, {result.location.address2}</Text>
        </View>

        <MapView style={styles.map} initialRegion={{
          latitude: result.coordinates.latitude,
          longitude: result.coordinates.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
          <Marker
            coordinate={{
              latitude: result.coordinates.latitude,
              longitude: result.coordinates.longitude,
            }}
            title={result.name}
          />
        </MapView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  background: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 4,
    marginBottom: 5,
    marginRight: 10,
  },
  infoContainer: {
    paddingHorizontal: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contact: {
    fontSize: 18,
    marginBottom: 4,
  },
  rating: {
    fontSize: 18,
    marginBottom: 4,
  },
  reviewCount: {
    fontSize: 18,
    marginBottom: 4,
  },
  country: {
    fontSize: 18,
    marginBottom: 4,
  },
  city: {
    fontSize: 18,
    marginBottom: 4,
  },
  address: {
    fontSize: 18,
    marginBottom: 4,
  },
  map: {
    height: 300,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
  },
  wishlistIcon: {
    position: 'absolute',
    top: 220,
    right: 25,
    zIndex: 1,
  },
});

export default ResultsShowScreen;
