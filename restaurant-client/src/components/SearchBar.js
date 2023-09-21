import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Input, Icon } from "@ui-kitten/components";
import { myTheme } from "../../eva"; 

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  return (
    <View style={styles.backgroundStyle}>
      <Feather name="search" style={styles.iconStyle} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        autoCapitalize="none"
        autoCorrect={false}
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
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
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#F0EEEE",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 10,
  },
});

export default SearchBar;
