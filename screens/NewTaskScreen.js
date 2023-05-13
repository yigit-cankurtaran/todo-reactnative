import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NewTaskScreen() {
  const theme = useTheme();
  const [taskName, setTaskName] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  // const project = route.params.project || { tasks: [] }; // ensure project has tasks
  const { projectId, taskId, tasks } = route.params;
  console.log(`Project id: ${projectId}`);
  console.log(`Task id: ${taskId}`);

  function saveTask() {
    // create new task
    // might need to change the id to taskId
    const newTask = {
      id: Date.now().toString(),
      name: taskName,
      done: false,
    };
    // update project data with new task
    let updatedTasks = [...tasks, newTask];
    // save updatedTasks to async storage
    AsyncStorage.setItem(`@tasks_${projectId}`, JSON.stringify(updatedTasks));
    console.log(`Tasks: ${JSON.stringify(tasks)}`);
    console.log(`Updated tasks: ${JSON.stringify(updatedTasks)}`);
    // THE REASON FOR THE TASKS NOT DISPLAYING MIGHT BE BC I'M DISPLAYING TASKS AND NOT UPDATEDTASKS
    console.log(`Task ${newTask.name} with id ${newTask.id} saved.`);
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>New Task</Text>
      <TextInput
        placeholder="Enter task name."
        value={taskName}
        onChangeText={(text) => setTaskName(text)}
      />
      <Button
        mode="contained"
        onPress={saveTask}
        buttonColor={theme.colors.primary}
      >
        Save
      </Button>
    </View>
  );
}
