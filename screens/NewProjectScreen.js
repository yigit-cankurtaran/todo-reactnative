import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NewProjectScreen({ navigation }) {
  const theme = useTheme();
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("projects");
        if (jsonValue !== null) {
          setProjects(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.log(e);
      }
    };
    getProjects();
  }, []);

  async function handleSave() {
    try {
      const newProject = {
        id: new Date().getTime(),
        name: projectName,
        tasks: [],
      };
      await AsyncStorage.setItem(
        newProject.id.toString(),
        JSON.stringify(newProject)
      );
      console.log(`New project ${newProject.name} saved!`);
      setProjects([...projects, newProject]);
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
        color={theme.colors.primary}
      >
        Save
      </Button>
    </View>
  );
}
