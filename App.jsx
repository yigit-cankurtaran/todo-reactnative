import Navigation from "./Navigation";
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import {
  List,
  Divider,
  FAB,
  useTheme,
  TextInput,
  Button,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import theme from "./Theme";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import ProjectScreen from "./screens/ProjectScreen";
import NewProjectScreen from "./screens/NewProjectScreen";
import NewTaskScreen from "./screens/NewTaskScreen";

export default function App() {
  return <Navigation />;
}
