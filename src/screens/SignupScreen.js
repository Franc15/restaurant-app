import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Text, Button, Input, Icon, Layout } from "@ui-kitten/components";
// import {  Input } from "react-native-elements";
// import Spacer from "../components/Spacer";
import foodieApi from "../api/app";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import { myTheme } from "../../eva";
import SignUpImage from "../../assets/signup-page.jpeg";
const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const signup = async () => {
    try {
      const response = await foodieApi.post("/signup", {
        name,
        email,
        password,
      });
      setErrorMessage("");
      //   dispatch(setUser(response.data.data));

      navigation.navigate("Signin");
    } catch (err) {
      console.log(err);
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <Layout style={styles.container}>
      <ImageBackground source={SignUpImage} style={styles.backgroundImage}>
        <Layout style={styles.SignUpForm}>
          <Layout style={styles.layout} level="1">
            <Text category="h2">Sign up</Text>
          </Layout>
          <Layout style={styles.layout} level="1">
            <Input
              label="Name"
              type="name"
              value={name}
              onChangeText={setName}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Layout>
          <Layout style={styles.layout} level="1">
            <Input
              label="Email"
              type="email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Layout>
          <Layout style={styles.layout} level="1">
            <Input
              label="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Layout>

          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}

          {/* <Button title="Sign Up" onPress={() => navigation.navigate("mainFlow")} /> */}
          <Layout style={styles.layout} level="1">
            <Button
              style={[
                {
                  backgroundColor: myTheme.colors.primary,
                  borderColor: myTheme.colors.primary,
                  width: "100%",
                },
              ]}
              onPress={() => signup()}
            >
              Sign Up
            </Button>
          </Layout>

          <Layout style={styles.layout} level="1">
            <Text
              category="s1"
              style={[{ color: myTheme.colors.primary }]}
              onPress={() => navigation.navigate("Signin")}
            >
              Already have an account? Sign in
            </Text>
          </Layout>
        </Layout>
      </ImageBackground>
    </Layout>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    padding: 0,
    margin: 0,
  },
  SignUpForm: {
    height: "50%",
    padding: 15,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});

export default SignupScreen;
