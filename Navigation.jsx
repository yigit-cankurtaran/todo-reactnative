import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import ProjectScreen from "./screens/ProjectScreen";
import NewProjectScreen from "./screens/NewProjectScreen";
import NewTaskScreen from "./screens/NewTaskScreen";

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Project" component={ProjectScreen} />
        <Stack.Screen name="New Project" component={NewProjectScreen} />
        <Stack.Screen name="New Task" component={NewTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
