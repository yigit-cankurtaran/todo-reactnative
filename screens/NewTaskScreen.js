import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function NewTaskScreen() {
  const [taskName, setTaskName] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  // const project = route.params.project || { tasks: [] }; // ensure project has tasks
  const { projectId, taskId, tasks } = route.params;
  console.log(`Project id: ${projectId}`);
  console.log(`Task id: ${taskId}`);

  function saveTask() {
    // create new task
    const newTask = {
      id: Date.now().toString(),
      name: taskName,
      done: false,
    };
    // update project data with new task
    let updatedTasks = [...tasks, newTask];
    // set updated project data as parameter and navigate back to ProjectScreen
    navigation.setParams(updatedTasks);
    console.log(`Tasks: ${JSON.stringify(tasks)}`);
    console.log(`Updated tasks: ${JSON.stringify(updatedTasks)}`);
    // THE REASON FOR THE TASKS NOT DISPLAYING MIGHT BE BC I'M DISPLAYING TASKS AND NOT UPDATEDTASKS
    console.log(`Task ${newTask.name} with id ${newTask.id} saved.`);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text>New Task</Text>
      <TextInput
        placeholder="Enter task name."
        value={taskName}
        onChangeText={(text) => setTaskName(text)}
      />
      <Button title="Save" onPress={saveTask} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "purple",
  },
});
