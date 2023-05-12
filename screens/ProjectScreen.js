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

  // bugs: when editing a task, the task is not updated in the list
  // when more than one task is present, one long press on a task will trigger the editing of the task below it
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedTaskId, setEditedTaskId] = useState(null);

  async function handleChangeTaskName() {
    const updatedTasks = tasks.map((task) =>
      task.id === editedTaskId ? { ...task, name: editedName } : task
    );
    setTasks(updatedTasks);
    setIsEditing(false);
    setEditedTaskId(null);
    setEditedName("");
  }

  function handleStartEditing(id, initialName) {
    setIsEditing(true);
    setEditedTaskId(id);
    console.log(`Editing task ${JSON.stringify(id)}`);
    setEditedName(initialName);
  }
  function handleCancelEditing() {
    setEditedName("");
    setIsEditing(false);
    console.log(`Editing task ${JSON.stringify(editedTaskId)} cancelled`);
    setEditedTaskId(null);
  }
  function handleFinishEditing() {
    if (editedName.length === 0) {
      Alert.alert("Error", "Task name cannot be empty", [
        {
          text: "OK",
          onPress: handleCancelEditing,
        },
      ]);
    } else {
      handleChangeTaskName();
      console.log(`Editing task ${JSON.stringify(editedTaskId)} finished`);
    }
  }

  function renderTaskItem({ item }) {
    const isEditingThisTask = editedTaskId === item.id;

    return (
      <List.Item
        title={
          isEditingThisTask ? (
            <TextInput
              value={editedName}
              onChangeText={setEditedName}
              autoFocus
              onSubmitEditing={() => handleFinishEditing(item.id)}
              onBlur={handleCancelEditing}
              style={{ backgroundColor: "transparent", margin: 0 }}
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
        onLongPress={() => handleStartEditing(item.id, item.name)}
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
