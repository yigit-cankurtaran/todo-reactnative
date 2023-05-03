import React, { useEffect, useState } from "react";
import { View, FlatList, Alert } from "react-native";
import { List, FAB, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProjectScreen({ route, navigation }) {
  const { id, name } = route.params;
  const [tasks, setTasks] = useState([]);
  const theme = useTheme();

  // Fetching tasks from AsyncStorage when the component mounts
  useEffect(() => {
    async function fetchTasks() {
      try {
        const jsonValue = await AsyncStorage.getItem(`@tasks_${id}`);
        if (jsonValue != null) {
          setTasks(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchTasks();
  }, []);

  // Saving tasks to AsyncStorage when the tasks state changes
  useEffect(() => {
    async function saveTasks() {
      try {
        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem(`@tasks_${id}`, jsonValue);
      } catch (e) {
        console.log(e);
      }
    }
    saveTasks();
  }, [tasks]);

  function handleAddTask() {
    console.log(id);
    console.log(name);
    const newTaskId = Date.now().toString();
    navigation.navigate("New Task", {
      projectId: id,
      taskId: newTaskId,
      tasks,
    });
  }

  async function handleToggleTask(taskId) {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  }

  async function handleDeleteTask(taskId) {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            // Remove task from AsyncStorage
            async function removeTask() {
              try {
                await AsyncStorage.removeItem(`@task_${taskId}`);
              } catch (e) {
                console.error(e);
              }
            }
            removeTask();

            // Remove task from tasks state
            const filteredTasks = tasks.filter((task) => task.id !== taskId);
            setTasks(filteredTasks);
          },
        },
      ],
      { cancelable: false }
    );
  }

  function renderTaskItem({ item, index }) {
    console.log(`item: ${item}`);
    return (
      <List.Item
        title={item.name}
        titleStyle={item.done ? { textDecorationLine: "line-through" } : {}}
        onPress={() => handleToggleTask(item.id)}
        right={() => (
          <List.Icon
            color={theme.colors.secondary}
            icon="delete"
            onPress={() => handleDeleteTask(item.id)}
          />
        )}
        left={() => (
          <List.Icon
            color={theme.colors.secondary}
            icon={
              item.done ? "checkbox-marked-outline" : "checkbox-blank-outline"
            }
          />
        )}
        key={item.id + index}
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
