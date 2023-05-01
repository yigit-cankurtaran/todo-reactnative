import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NewTaskScreen({ route, navigation }) {
  const theme = useTheme();
  const { projectId } = route.params;
  const [taskName, setTaskName] = React.useState("");

  async function handleSave() {
    if (taskName === "") {
      return;
    }
    try {
      const taskId = Date.now().toString();
      const task = {
        id: taskId,
        name: taskName,
        completed: false,
      };
      const tasksJson = await AsyncStorage.getItem(projectId.toString());
      if (tasksJson != null) {
        const tasks = JSON.parse(tasksJson);
        tasks.push(task);
        await AsyncStorage.setItem(projectId.toString(), JSON.stringify(tasks));
      } else {
        await AsyncStorage.setItem(
          projectId.toString(),
          JSON.stringify([task])
        );
      }
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
