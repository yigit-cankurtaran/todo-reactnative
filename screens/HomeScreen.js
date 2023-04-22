import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { List, Divider, FAB, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const projects = await AsyncStorage.multiGet(keys);

        setProjects(projects.map(([key, value]) => JSON.parse(value)));
      } catch (e) {
        console.log(e);
      }
    };
    getProjects();
  }, []);

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
    navigation.navigate("NewProject");
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={projects}
        renderItem={renderItem}
        keyExtractor={(item) => (item.id ? item.id.toString() : "")}
        ItemSeparatorComponent={() => <Divider />}
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
