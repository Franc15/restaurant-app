import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Text, Button, Layout } from "@ui-kitten/components";
import { myTheme } from "../../eva";
import mainPageImage from "../../assets/main-page.jpg";

const MainScreen = ({ navigation }) => {
  return (
    <Layout style={styles.container}>
      <ImageBackground source={mainPageImage} style={styles.backgroundImage}>
        {/* Add a semi-transparent background color */}
        <View style={styles.overlay}>
          <View style={styles.glassEffect}>
            <View>
            <Text category="h1" style={{ color: '#fff', textAlign: 'center' }}>
              Welcome To
            </Text>
            <Text category="h1" style={{ color: myTheme.colors.primary, textAlign: 'center' }}>
              Foodie Findr!
            </Text>

            </View>
            <View style={styles.buttonContainer}>
            <Button
                appearance="outline"
                status="warning"
                style={{
                  backgroundColor: "#fff",
                  borderColor: "#fff",
                  marginVertical: 10,
                  borderRadius: 50
                }}
                onPress={() => navigation.navigate("Signin")}
              >
                Sign In
              </Button>
              <Button
                style={{
                  backgroundColor: myTheme.colors.primary,
                  borderColor: myTheme.colors.primary,
                  marginVertical: 10,
                  borderRadius: 50
                }}
                onPress={() => navigation.navigate("Signup")}
              >
                Sign Up
              </Button>
              
            </View>
          </View>
        </View>
      </ImageBackground>
    </Layout>
  );
};

MainScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 0,
    margin: 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-between",
    padding: 0,
    margin: 0,
  },
  overlay: {
    flex: 1,
    textAlign: "center",
    justifyContent: "flex-end",
    backgroundColor:"rgba(0, 0, 0, 0.25)"
  },

  // Add a semi-transparent background color
  glassEffect: {
    backgroundColor: "rgba(255, 255, 255, 0.55)",
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: "space-between",
    height: "50%",
    borderColor: '#fff',
    borderWidth: 1,
  },
  buttonContainer: {
    alignSelf: "stretch",
    justifyContent: "flex-end",
  },
});

export default MainScreen;
