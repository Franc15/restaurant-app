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
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons or any other icon library you prefer

// Define your icons here
const searchIcon = <Icon name="search" size={24} color="white" />;
const mapIcon = <Icon name="map" size={24} color="white" />;
const wishlistIcon = <Icon name="heart" size={24} color="white" />;
const accountIcon = <Icon name="person" size={24} color="white" />;

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
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createMaterialBottomTabNavigator(
    {
      restaurantListFlow: {
        screen: createStackNavigator({
          Search: SearchScreen,
          ResultsShow: ResultsShowScreen,
        }),
        navigationOptions: {
          tabBarLabel: (
            <Text category="h6" style={{ color: "white", fontSize: 12 }}>
              Search
            </Text>
          ),
          tabBarIcon: ({ tintColor }) => (
            <Text category="h3" style={{ color: "white" }}>
              {searchIcon}
            </Text>
          ),
        },
      },
      Map: {
        screen: ResultsMap,
        navigationOptions: {
          tabBarLabel: (
            <Text category="h6" style={{ color: "white", fontSize: 12 }}>
              Map
            </Text>
          ),
          tabBarIcon: ({ tintColor }) => (
            <Text category="h3" style={{ color: "white" }}>
              {mapIcon}
            </Text>
          ),
        },
      },
      Wishlist: {
        screen: WishlistScreen,
        navigationOptions: {
          tabBarLabel: (
            <Text category="h6" style={{ color: "white", fontSize: 12 }}>
              Wishlist
            </Text>
          ),
          tabBarIcon: ({ tintColor }) => (
            <Text category="h3" style={{ color: "white" }}>
              {wishlistIcon}
            </Text>
          ),
        },
      },
      Account: {
        screen: AccountScreen,
        navigationOptions: {
          tabBarLabel: (
            <Text category="h6" style={{ color: "white", fontSize: 12 }}>
              Account
            </Text>
          ),
          tabBarIcon: ({ tintColor }) => (
            <Text category="h3" style={{ color: "white" }}>
              {accountIcon}
            </Text>
          ),
        },
      },
    },
    {
      initialRouteName: "restaurantListFlow",
      barStyle: { backgroundColor: myTheme.colors.primary },
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
