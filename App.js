import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./screens/HomeScreen";
import NewProjectScreen from "./screens/NewProjectScreen";
import ProjectScreen from "./screens/ProjectScreen";
import NewTaskScreen from "./screens/NewTaskScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewProject" component={NewProjectScreen} />
        <Stack.Screen name="Project" component={ProjectScreen} />
        <Stack.Screen name="NewTask" component={NewTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
