import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform } from "react-native";
import Spacer from "../components/Spacer";
import foodieApi from "../api/app";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingContainer}
        >
          <Layout style={styles.SignInForm} level="1">
            <Text category="h2" style={{textAlign:'center'}}>Sign in</Text>
            <Input
              label="Email"
              type="email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.formInputStyle}
            />
            <Input
              label="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.formInputStyle}
            />
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            <Button
              style={{
                backgroundColor: myTheme.colors.primary,
                borderColor: myTheme.colors.primary,
                width: "100%",
              }}
              onPress={() => signin()}
            >
              {loading ? "Signing you in..." : "Sign In"}
            </Button>
            <Text
              category="s1"
              style={[styles.formInputStyle,{ color: myTheme.colors.primary, textAlign:'center' }]}
              onPress={() => navigation.navigate("Signup")}
            >
              Don't have an account? Sign up
            </Text>
          </Layout>
        </KeyboardAvoidingView>
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
  },
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: "flex-end", // Move the form to the top when the keyboard appears
  },
  SignInForm: {
    padding: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 1)",
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
  formInputStyle:{
    marginVertical:10
  },
 
});

export default SigninScreen;
