import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import Spacer from "../components/Spacer";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import foodieApi from "../api/app";
import { Text, Button, Input, Icon, Layout } from "@ui-kitten/components";
import { myTheme } from "../../eva";
import SignInImage from "../../assets/signin-page.jpg";
const SigninScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signin = async () => {
    setLoading(true);
    try {
      const response = await foodieApi.post("/login", {
        email,
        password,
      });
      setErrorMessage("");
      dispatch(setUser(response.data.data));
      navigation.navigate("mainFlow");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={SignInImage} style={styles.backgroundImage}>
        <Layout style={styles.SignInForm}>
          <Layout style={styles.layout} level="1">
            <Text category="h2">Sign in</Text>
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
          <Layout style={styles.layout} level="1">
            <Button
              style={[
                {
                  backgroundColor: myTheme.colors.primary,
                  borderColor: myTheme.colors.primary,
                  width: "100%",
                },
              ]}
              onPress={() => signin()}
            >
              {loading ? "Signing you in..." : "Sign In"}
            </Button>
          </Layout>
          <Layout style={styles.layout} level="1">
            <Text
              category="s1"
              style={{ color: myTheme.colors.primary }}
              onPress={() => navigation.navigate("Signup")}
            >
              Don't have an account? Sign up
            </Text>
          </Layout>
        </Layout>
      </ImageBackground>
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
  SignInForm: {
    height: "50%",
    padding: 15,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
  },
});

export default SigninScreen;
