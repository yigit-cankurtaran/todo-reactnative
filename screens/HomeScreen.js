import React, { useEffect, useState } from "react";
import { View, FlatList, AsyncStorage } from "react-native";
import { List, Divider, FAB, useTheme } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const [projects, setProjects] = useState([]);

  // load data from async storage on component mount
  useEffect(() => {
    AsyncStorage.getItem("projects").then((data) => {
      if (data) {
        setProjects(JSON.parse(data));
      }
    });
  }, []);

  // save data to async storage on projects change
  useEffect(() => {
    AsyncStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  function renderItem({ item }) {
    return (
      <List.Item
        title={item.name}
        onPress={() =>
          navigation.navigate("Project", { id: item.id, name: item.name })
        }
      />
    );
  }

  function handleNewProject() {
    const newProject = { id: projects.length + 1, name, tasks: [] };
    setProjects([...projects, newProject]);
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={projects}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={Divider}
      />
      {/* the above line might be problematic, if so just change the divider part into an arrow function */}
      <FAB
        style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
        icon="plus"
        onPress={() => navigation.navigate("NewProject")}
        color={theme.colors.surface}
      />
    </View>
  );
}
