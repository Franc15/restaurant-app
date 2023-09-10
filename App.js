import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { ApplicationProvider, Text, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons"; // Import EvaIconsPack
import { myTheme } from "./eva"; // Import your UI Kitten theme
import SearchScreen from "./src/screens/SearchScreen";
import ResultsShowScreen from "./src/screens/ResultsShowScreen";

const navigator = createStackNavigator(
  {
    Search: SearchScreen,
    ResultsShow: ResultsShowScreen,
  },
  {
    initialRouteName: "Search",
    defaultNavigationOptions: {
      headerTitle: () => (
       
          <Text category="h3" style={{ color: 'white' }}>
            FoodieFindr
          </Text>
      ),
      headerStyle: {
        backgroundColor: myTheme.colors.primary, // Background color
      },
    },
  }
);

const AppNavigator = createAppContainer(navigator);

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={myTheme}>
        <AppNavigator />
      </ApplicationProvider>
    </>
  );
};

export default App;
