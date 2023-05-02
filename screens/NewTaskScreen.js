import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function NewTaskScreen() {
  const [taskName, setTaskName] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const project = route.params.project; // get the project data from the route

  function saveTask() {
    // create new task
    const newTask = {
      id: Math.random().toString(),
      name: taskName,
      completed: false,
    };
    // update project data with new task
    const updatedProject = {
      ...project,
      tasks: [...project.tasks, newTask],
    };
    // set updated project data as parameter and navigate back to ProjectScreen
    navigation.setParams({ project: updatedProject });
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
  },
});
