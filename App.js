import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { ApplicationProvider, Text, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons"; // Import EvaIconsPack
import { myTheme } from "./eva"; // Import your UI Kitten theme
import SearchScreen from "./src/screens/SearchScreen";
import ResultsShowScreen from "./src/screens/ResultsShowScreen";
import ResultsMap from "./src/components/ResultsMap";
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import WishlistScreen from "./src/screens/WishlistScreen";
import AccountScreen from "./src/screens/AccountScreen";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import MainScreen from "./src/screens/MainScreen";
const navigator = createStackNavigator(
  {
    Search: SearchScreen,
    ResultsShow: ResultsShowScreen,
    Map: ResultsMap,
    Signup: SignupScreen,
    Signin: SigninScreen,
  },
  {
    initialRouteName: "Search",
    defaultNavigationOptions: {
      headerTitle: () => (
        <Text category="h3" style={{ color: "white" }}>
          FoodieFindr
        </Text>
      ),
      headerStyle: {
        backgroundColor: myTheme.colors.primary, // Background color
      },
    },
  }
);

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Main: MainScreen,
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createMaterialBottomTabNavigator(
    {
      restaurantListFlow: createStackNavigator({
        Search: SearchScreen,
        ResultsShow: ResultsShowScreen,
      }),
      Map: ResultsMap,
      Wishlist: WishlistScreen,
      // Account: AccountScreen,
    },
    {
      initialRouteName: "restaurantListFlow",
      defaultNavigationOptions: {
        headerTitle: () => (
          <Text category="h3" style={{ color: "white" }}>
            FoodieFindr
          </Text>
        ),
        headerStyle: {
          backgroundColor: myTheme.colors.primary,
        },
      },
    }
  ),
});

const AppNavigator = createAppContainer(switchNavigator);

const App = () => {
  return (
    <>
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={myTheme}>
          <AppNavigator />
        </ApplicationProvider>
      </Provider>
    </>
  );
};

export default App;
