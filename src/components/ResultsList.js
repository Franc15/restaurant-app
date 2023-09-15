import React from "react";
import { StyleSheet, View ,TouchableOpacity } from "react-native";
import { Card, Text } from "@ui-kitten/components"; 
import ResultsDetail from "./ResultsDetail";
import { withNavigation } from "react-navigation";
import { myTheme } from "../../eva";
const ResultsList = ({ title, results, navigation }) => {
  if (!results.length) {
    return null;
  }

  return (
    <>
      <Text
        category="h5"
        style={[styles.titleStyle, { color: myTheme.colors.primary }]}
      >
        {title}
      </Text>
      {results.map((item) => (
        <TouchableOpacity 
          key={item.id}
          horizontal
          style={styles.cardItem}
          onPress={() => navigation.navigate("ResultsShow", { id: item.id })}
        >
          <ResultsDetail result={item} />
        </TouchableOpacity >
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    marginLeft: 10,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardItem: {
    marginRight: 10,
    height: 250,
    padding: 0,
    marginLeft: 10,
    borderRadius: 5,
  },
});

export default withNavigation(ResultsList);
