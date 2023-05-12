import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FAB, List, TextInput } from "react-native-paper";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theme from "../Theme";

export default function ProjectScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, name } = route.params;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      try {
        const jsonValue = await AsyncStorage.getItem(`@tasks_${id}`);
        if (jsonValue != null) {
          const loadedTasks = JSON.parse(jsonValue);
          setTasks(loadedTasks);
        }
      } catch (e) {
        console.log(e);
      }
    }

    loadTasks();
  }, []);

  async function fetchTasks() {
    try {
      const jsonValue = await AsyncStorage.getItem(`@tasks_${id}`);
      if (jsonValue != null) {
        const loadedTasks = JSON.parse(jsonValue);
        setTasks(loadedTasks);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );

  useEffect(() => {
    async function saveTasks() {
      try {
        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem(`@tasks_${id}`, jsonValue);
        console.log("Saving tasks:", tasks);
      } catch (e) {
        console.log(e);
      }
    }
    saveTasks();
  }, [id, tasks]);

  function handleAddTask() {
    console.log(id);
    console.log(name);
    const newTaskId = Date.now().toString();
    navigation.navigate("New Task", {
      projectId: id,
      id: newTaskId,
      tasks,
    });
  }

  async function handleToggleTask(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  }

  async function handleDeleteTask(id) {
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
            async function removeTask() {
              try {
                await AsyncStorage.removeItem(`@task_${id}`);
              } catch (e) {
                console.error(e);
              }
            }
            removeTask();
            const filteredTasks = tasks.filter((task) => task.id !== id);
            setTasks(filteredTasks);
          },
        },
      ],
      { cancelable: false }
    );
  }

  // TODO: Implement task name editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  async function handleChangeTaskName() {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, name: editedName } : task
    );
    setTasks(updatedTasks);
    setIsEditing(false);
  }

  function handleStartEditing() {
    setIsEditing(true);
  }
  function handleCancelEditing() {
    setEditedName("");
    setIsEditing(false);
  }
  function handleFinishEditing() {
    handleChangeTaskName(item.id, editedName);
    setIsEditing(false);
  }

  function renderTaskItem({ item }) {
    return (
      <List.Item
        title={
          isEditing ? (
            <TextInput
              value={editedName}
              onChangeText={setEditedName}
              autoFocus
              onSubmitEditing={handleFinishEditing}
              onBlur={handleCancelEditing}
              style={{ flex: 1 }}
              // the above style is needed to make the text input fill the entire width of the list item
            />
          ) : (
            item.name
          )
        }
        titleStyle={item.done ? { textDecorationLine: "line-through" } : {}}
        onPress={() => handleToggleTask(item.id)}
        right={() => (
          <List.Icon
            color={theme.colors.secondary}
            icon={item.done ? "check-circle-outline" : "circle-outline"}
          />
        )}
        left={() => (
          <TouchableOpacity
            onPress={() => handleDeleteTask(item.id)}
            style={{ backgroundColor: "transparent" }}
          >
            <List.Icon color={theme.colors.secondary} icon="delete" />
          </TouchableOpacity>
        )}
        onLongPress={handleStartEditing}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <FAB style={styles.fab} onPress={handleAddTask} icon="plus" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    padding: 16,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
