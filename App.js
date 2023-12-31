import React from "react";
import { View, Image } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { ApplicationProvider, Text, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { myTheme } from "./eva";
import SearchScreen from "./src/screens/SearchScreen";
import ResultsShowScreen from "./src/screens/ResultsShowScreen";
import ResultsMap from "./src/components/ResultsMap";
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import WishlistScreen from "./src/screens/WishlistScreen";
import AccountScreen from "./src/screens/AccountScreen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store/store";

// Define your icons here
import Icon from 'react-native-vector-icons/Ionicons';
import MainScreen from "./src/screens/MainScreen";
import FoodieFindrLogo from "./assets/splash.png"
const searchIcon = <Icon name="search" size={24} color="white" />;
const mapIcon = <Icon name="map" size={24} color="white" />;
const wishlistIcon = <Icon name="heart" size={24} color="white" />;
const accountIcon = <Icon name="person" size={24} color="white" />;

const logoutIcon = (
  <Icon
    name="log-out"
    size={24}
    color="black"
    style={{ marginRight: 10, backgroundColor: "transparent" }}
    onPress={() => {
      // Handle the logout action here
    }}
  />
);

// const navigator = createStackNavigator(
//   {
//     Search: SearchScreen,
//     ResultsShow: ResultsShowScreen,
//     Map: ResultsMap,
//     Signup: SignupScreen,
//     Signin: SigninScreen,
//   },
//   {
//     initialRouteName: "Search",
//     defaultNavigationOptions: {
//       headerTitle: () => (
//         <Text category="h3" style={{ color: "white" }}>
//           FoodieFindr
//         </Text>
//       ),
//       headerStyle: {
//         backgroundColor: myTheme.colors.primary,
//       },
//     },
//   }
// );

// CustomHeader component for the "Search" screen header
const CustomHeader = () => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    {/* First column (empty) */}
    <View style={{ flex: 1 }}></View>

    {/* Second column (image) */}
    <View style={{ flex: 4, alignItems: "center" }}>
      <Image
        source={FoodieFindrLogo}
        style={{ width: 150, height: 50 }} // Customize the size
      />
    </View>

    {/* Third column (icon) */}
    <View style={{ flex: 1, alignItems: "flex-end" }}>{logoutIcon}</View>
  </View>
);

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Main: MainScreen,
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createMaterialBottomTabNavigator(
    {
      restaurantListFlow: {
        screen: createStackNavigator(
          {
            Search: {
              screen: SearchScreen,
              navigationOptions: ({ navigation }) => ({
                headerTitle: () => <CustomHeader />, // Use the CustomHeader component
              }),
            },
            ResultsShow: ResultsShowScreen,
          },
          {
            initialRouteName: 'Search',
            defaultNavigationOptions: {
              title: 'Business Search',
            },
          }
        ),
        navigationOptions: {
          tabBarLabel: (
            <Text
              category="h3"
              style={{
                color: "white",
                fontSize: 12,
              }}
            >
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
            <Text
              category="h3"
              style={{
                color: "white",
                fontSize: 12,
              }}
            >
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
            <Text
              category="h3"
              style={{
                color: "white",
                fontSize: 12,
              }}
            >
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
            <Text
              category="h3"
              style={{
                color: "white",
                fontSize: 12,
              }}
            >
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
      shifting: false,
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
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
          </PersistGate>
        </ApplicationProvider>
      </Provider>
    </>
  );
};

export default App;
