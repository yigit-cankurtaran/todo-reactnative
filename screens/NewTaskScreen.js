import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NewTaskScreen({ route, navigation }) {
  const theme = useTheme();
  const { projectId, name } = route.params;
  const [taskName, setTaskName] = React.useState("");

  async function handleSave() {
    console.log(`The first: ${taskName}`);
    console.log(`The second: ${name}`);
    console.log(`The third: ${projectId}`);

    if (taskName === "") {
      return;
    }
    try {
      const taskId = Date.now().toString();
      console.log(`The fourth: ${taskId}`);
      const task = {
        id: taskId,
        name: taskName,
        completed: false,
      };
      let tasks = [];
      const tasksJson = await AsyncStorage.getItem(projectId.toString());
      console.log(`The fifth: ${tasksJson}`);
      if (tasksJson != null) {
        const parsedTasks = JSON.parse(tasksJson);
        console.log(`The sixth: ${parsedTasks}`);
        tasks = Array.isArray(parsedTasks) ? parsedTasks : [parsedTasks];
        console.log(`The seventh: ${tasks}`);
      }
      tasks.push(task);
      console.log(`The eighth: ${task}`);
      await AsyncStorage.setItem(projectId.toString(), JSON.stringify(tasks));
      console.log(`New task ${task.name} saved!`);
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        label="Task Name"
        value={taskName}
        onChangeText={setTaskName}
        style={{ marginBottom: 16 }}
      />
      <TouchableOpacity
        onPress={handleSave}
        style={{
          backgroundColor: theme.colors.primary,
          padding: 12,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "#FFF", textAlign: "center" }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
