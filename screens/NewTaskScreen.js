import React from "react";
import { View } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";

export default function NewTaskScreen({ route, navigation }) {
  const theme = useTheme();
  const { projectId } = route.params;
  const [taskName, setTaskName] = React.useState("");

  function handleSave() {
    // TODO: save the task to the database after you implement it.
    console.log(`Saved task ${taskName} to project ${projectId}`);
    navigation.goBack();
  }

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        label="Task Name"
        value={taskName}
        onChangeText={setTaskName}
        style={{ marginBottom: 16 }}
      />
      <Button
        mode="contained"
        onPress={handleSave}
        buttonColor={theme.colors.primary}
      >
        Save
      </Button>
    </View>
  );
}
