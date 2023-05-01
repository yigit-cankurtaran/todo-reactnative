import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Button, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NewTaskScreen({ route, navigation }) {
  const theme = useTheme();
  const { projectId, taskId, tasks } = route.params;
  const [taskName, setTaskName] = useState("");

  async function handleSave() {
    if (taskName.trim() === "") return;
    try {
      const newTask = { id: taskId, name: taskName, done: false };
      const updatedTasks = [...tasks, newTask];
      await AsyncStorage.setItem(
        projectId.toString(),
        JSON.stringify(updatedTasks)
      );
      navigation.goBack();
      console.log(`Task ${taskId} saved`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Task Name"
        value={taskName}
        onChangeText={setTaskName}
      />
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save
      </Button>
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
