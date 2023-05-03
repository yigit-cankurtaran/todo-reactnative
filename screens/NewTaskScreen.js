import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function NewTaskScreen() {
  const [taskName, setTaskName] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const project = route.params.project || { tasks: [] }; // ensure project has tasks

  function saveTask() {
    // create new task
    const newTask = {
      id: (Math.random() * 100).toString(),
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
    console.log(updatedProject);
    console.log(project);
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
  },
});
