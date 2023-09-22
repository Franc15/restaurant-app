import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";

const SearchScreen = () => {
  const [term, setTerm] = useState("");

  const [searchApi, loading, results, errorMessage] = useResults();

  const filterResultsByPrice = (price) => {
    // price === '$' || '$$' || '$$$'
    return results.filter((result) => {
      return result.price === price;
    });
  };
  
  // if (loading) {
  //   return (
  //   <View style={[styles.container, styles.horizontal]}>
  //   <ActivityIndicator size="large" color="#0000ff" />;
  //   </View>
  //   );
  // }

  return (
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage && <Text>{errorMessage}</Text>}
      {loading ? <View style={[styles.container, styles.horizontal]}><ActivityIndicator size="large" color="#FF5733" /></View> : null}
      {!loading && results && <ScrollView>
        <ResultsList
          results={filterResultsByPrice("$")}
          title="Cost Effective"
        />
        <ResultsList 
        results={filterResultsByPrice("$$")} 
        title="Bit Pricier"
         />
        <ResultsList
          results={filterResultsByPrice("$$$")}
          title="Big Spender"
        />
      </ScrollView>}
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default SearchScreen;
