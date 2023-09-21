import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function ResultsMap() {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.restaurant.restaurants); // Assuming this is your array of restaurants

  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    setLoading(false); // Since you're using Redux, you don't need to fetch data here.
  }, []);

  const handleMarkerPress = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 40.7128, // Replace with your initial latitude
            longitude: -74.0060, // Replace with your initial longitude
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {results.map((restaurant) => (
            <Marker
              key={restaurant.id} // Assuming each restaurant has a unique ID
              coordinate={{
                latitude: restaurant.coordinates.latitude,
                longitude: restaurant.coordinates.longitude,
              }}
              title={restaurant.name}
              description={`Rating: ${restaurant.rating}, Phone: ${restaurant.phone}`}
              onPress={() => handleMarkerPress(restaurant)}
            />
          ))}
        </MapView>
      )}

      {selectedRestaurant && (
        <View style={styles.restaurantInfo}>
          <Text style={styles.businessName}>{selectedRestaurant.name}</Text>
          <Text style={styles.businessAddress}>
            {selectedRestaurant.location.display_address.join(', ')}
          </Text>
          <Text style={styles.businessPrice}>Price: {selectedRestaurant.price}</Text>
          <Text style={styles.businessReviews}>
            Reviews: {selectedRestaurant.review_count}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  restaurantInfo: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    elevation: 4,
    top: '75%', // Adjust the top position as needed
    left: '2.5%', // Adjust the left position as needed
    width: '90%', // Adjust the width as needed
  },
  businessName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  businessAddress: {
    fontSize: 14,
    marginBottom: 5,
  },
  businessPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  businessReviews: {
    fontSize: 14,
  },
});
