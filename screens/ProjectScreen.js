import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { List, Divider, FAB, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewTaskScreen from "./NewTaskScreen";

export default function ProjectScreen({ route, navigation }) {
  const theme = useTheme();
  const { id, name } = route.params;
  const [tasks, setTasks] = useState([]);

  console.log(route.params);

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
  }, [id]);

  function handleAddTask() {
    console.log(id);
    console.log(name);
    navigation.navigate("New Task", { projectId: id, name });
  }

  async function handleDeleteTask(taskId) {
    try {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      await AsyncStorage.setItem(id.toString(), JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      console.log(`Task ${taskId} deleted`);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleToggleTask(taskId) {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      );
      await AsyncStorage.setItem(id.toString(), JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      console.log(`Task ${taskId} toggled`);
    } catch (e) {
      console.log(e);
    }
  }

  function renderTaskItem({ item }) {
    return (
      <List.Item
        title={item.name}
        titleStyle={item.done ? { textDecorationLine: "line-through" } : {}}
        onPress={() => handleToggleTask(item.id)}
        right={() => (
          <List.Icon
            color={theme.colors.primary}
            icon="delete"
            onPress={() => handleDeleteTask(item.id)}
          />
        )}
        left={() => (
          <List.Icon
            color={theme.colors.primary}
            icon={item.done ? "check-box-outline" : "check-box-outline-blank"}
          />
        )}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <List.Section>
        <List.Subheader>{name}</List.Subheader>
        <FlatList
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id.toString()}
          // ItemSeparatorComponent={Divider}
          // if a bug happens uncomment the line above
        />
      </List.Section>
      <FAB
        style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
        icon="plus"
        onPress={handleAddTask}
        color={theme.colors.surface}
      />
    </View>
  );
}
