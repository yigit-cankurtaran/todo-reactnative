import React from "react";
import { View } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NewProjectScreen({ navigation }) {
  const theme = useTheme();
  const [projectName, setProjectName] = React.useState("");

  async function handleSave() {
    try {
      const NewProject = {
        id: new Date().getTime(),
        name: projectName,
        tasks: [],
      };
      await AsyncStorage.setItem(
        NewProject.id.toString(),
        JSON.stringify(NewProject)
      );
      console.log(`New project ${NewProject.name} saved!`);
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        label="Project Name"
        value={projectName}
        onChangeText={setProjectName}
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
