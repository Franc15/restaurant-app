import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import foodieApi from "../api/app";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";

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
    <View style={styles.container}>
      <Spacer>
        <Text h2>Sign up</Text>
      </Spacer>
      <Input
        label="Name"
        type="name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />

      <Input
        label="Email"
        type="email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      <Input
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        {/* <Button title="Sign Up" onPress={() => navigation.navigate("mainFlow")} /> */}
        <Button title="Sign Up" onPress={() => signup()} />
      </Spacer>
      <Text
        style={{ color: "blue" }}
        onPress={() => navigation.navigate("Signin")}
      >
        Already have an account? Sign in instead
      </Text>
    </View>
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
    justifyContent: "center",
    marginBottom: 250,
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
});

export default SignupScreen;