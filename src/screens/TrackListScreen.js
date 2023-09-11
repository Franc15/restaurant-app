import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TrackListScreen = ({ navigation }) => {
  return (
    <>
      <SafeAreaView forceInset={{ top: "always" }}></SafeAreaView>
      <Text style={{ fontSize: 48 }}>TrackListScreen</Text>
      <Button
        title="Go to Track Detail"
        onPress={() => navigation.navigate("TrackDetail")}
      />
      <SafeAreaView />
    </>
  );
};

const styles = StyleSheet.create({});

export default TrackListScreen;
