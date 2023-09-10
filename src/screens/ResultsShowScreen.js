import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import yelp from "../api/yelp";

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam('id');

  const getResult = async id => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  return (
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

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{result.name}</Text>
        <Text style={styles.contact}>Contact: {result.phone}</Text>
        <Text style={styles.rating}>Rating: {result.rating}</Text>
        <Text style={styles.reviewCount}>Total Reviews: {result.review_count}</Text>
        <Text style={styles.country}>Country: {result.location.country}</Text>
        <Text style={styles.city}>City: {result.location.city}</Text>
        <Text style={styles.address}>Location: {result.location.address1}, {result.location.address2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 4,
    marginBottom: 5,
    marginRight: 10, // Add margin to create space between images
  },
  infoContainer: {
    paddingHorizontal: 8,
  },
  name: {
    marginTop: 20,
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
    marginBottom: 1000,
  },
});

export default ResultsShowScreen;
