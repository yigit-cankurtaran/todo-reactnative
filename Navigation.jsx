import React, { useState } from "react";
import { useColorScheme, Switch } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import ProjectScreen from "./screens/ProjectScreen";
import NewProjectScreen from "./screens/NewProjectScreen";
import NewTaskScreen from "./screens/NewTaskScreen";

const Stack = createStackNavigator();

export default function Navigation() {
  // Detect the device theme
  const scheme = useColorScheme();
  // Create a state variable to store the theme value
  const [isDarkTheme, setIsDarkTheme] = useState(scheme === "dark");
  // Create a function to toggle the theme value
  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    // Pass the theme value to the NavigationContainer component
    <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        {/* Pass the theme value as a prop to your HomeScreen component */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ theme: isDarkTheme ? DarkTheme : DefaultTheme }}
        />
        <Stack.Screen name="Project" component={ProjectScreen} />
        <Stack.Screen name="New Project" component={NewProjectScreen} />
        <Stack.Screen name="New Task" component={NewTaskScreen} />
      </Stack.Navigator>
      {/* Add a switch component to toggle the theme */}
      <Switch
        style={{ position: "absolute", margin: 16, left: 0, bottom: 0 }}
        value={isDarkTheme}
        onValueChange={toggleTheme}
      />
    </NavigationContainer>
  );
}
