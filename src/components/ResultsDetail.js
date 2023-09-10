import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { myTheme } from "../../eva";
import { Icon } from '@ui-kitten/components';

const ResultsDetail = ({ result }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.imageStyle} source={{ uri: result.image_url }} />
      <View style={styles.overlay}>
        <Text category="h4" style={styles.nameStyle}>{result.name}</Text>
        <View style={styles.ratingContainer}>
          <Icon
            name="star"
            fill={myTheme.colors.warning}
            width={20}
            height={20}
          />
          <Text category="s1" style={styles.ratingStyle}>
            {result.rating}
          </Text>
          <Icon name="book-open-outline" width={20} height={20} fill="white"/>
          <Text category="s1" style={styles.ratingStyle}>
            {result.review_count} 
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 10,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    padding: 10,
    borderRadius: 20,
  },
  nameStyle: {
    color: "white",
    fontWeight: "bold",
  },
  ratingStyle: {
    color: "white",
    marginLeft: 5, 
    marginRight:10
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center', 
  },
});

export default ResultsDetail;
