import React from "react";
import { StyleSheet } from "react-native";
import { Input, Icon } from "@ui-kitten/components";
import { myTheme } from "../../eva"; 

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  return (
    <Input
      style={styles.input}
      placeholder="Search"
      autoCapitalize="none"
      autoCorrect={false}
      value={term}
      onChangeText={onTermChange}
      onSubmitEditing={onTermSubmit}
      accessoryRight={(props) => (
        <Icon
          {...props}
          name="search-outline" 
          fill={myTheme.colors.primary} 
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: myTheme.colors.primary, 
  },
});

export default SearchBar;
