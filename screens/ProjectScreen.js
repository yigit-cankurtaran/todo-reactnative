import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { List, Divider, FAB, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProjectScreen({ route, navigation }) {
  const theme = useTheme();
  const { id, name } = route.params;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const tasksJson = await AsyncStorage.getItem(id.toString());
        if (tasksJson != null) {
          setTasks(JSON.parse(tasksJson));
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchTasks();
  }, []);

  function renderItem({ item }) {
    return (
      <List.Item
        title={item.name}
        onPress={() =>
          navigation.navigate("NewTask", { id: item.id, name: item.name })
        }
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <List.Subheader>{name}</List.Subheader>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={Divider}
      />
      <FAB
        style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
        icon="plus"
        onPress={() => navigation.navigate("NewTask")}
        color={theme.colors.surface}
      />
    </View>
  );
}
