import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from "react-native";
import { List, Divider, FAB, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const [projects, setProjects] = useState([]);
  const [shouldFetchProjects, setShouldFetchProjects] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProjects = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const projects = await AsyncStorage.multiGet(keys);

      setProjects(
        projects
          .map(([key, value]) => {
            try {
              const parsedValue = JSON.parse(value);
              if (parsedValue && parsedValue.id) {
                return parsedValue;
              }
            } catch (e) {
              console.log(e);
            }
          })
          .filter((project) => project !== undefined)
      );
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProjects();
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchProjects().then(() => setRefreshing(false));
  }, []);

  function handleDeleteProject(id) {
    try {
      AsyncStorage.removeItem(id.toString());
      setProjects(projects.filter((project) => project.id !== id));
      setShouldFetchProjects(true);
    } catch (e) {
      console.log(e);
    }
  }

  function renderItem({ item }) {
    return (
      <List.Item
        title={item.name}
        onPress={() =>
          navigation.navigate("Project", { id: item.id, name: item.name })
        }
        right={() => (
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Delete Project",
                `Are you sure you want to delete ${item.name}?`,
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                      handleDeleteProject(item.id);
                      console.log(`Project ${item.name} deleted!`);
                    },
                  },
                ]
              );
            }}
          >
            <List.Icon color={theme.colors.primary} icon="delete" />
          </TouchableOpacity>
        )}
      />
    );
  }

  function handleNewProject() {
    navigation.navigate("New Project");
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={projects}
        renderItem={renderItem}
        keyExtractor={(item) => (item.id ? item.id.toString() : "")}
        // the above line might be problematic, if so just change the ternary part into just toString()
        ItemSeparatorComponent={() => <Divider />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {/* the above line might be problematic, if so just change the divider part into an arrow function */}
      <FAB
        style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
        icon="plus"
        onPress={() => handleNewProject()}
        color={theme.colors.surface}
      />
    </View>
  );
}
