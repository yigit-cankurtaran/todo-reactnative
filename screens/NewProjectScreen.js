import React from "react";
import { View } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";

export default function NewProjectScreen({ navigation }) {
  const theme = useTheme();
  const [projectName, setProjectName] = React.useState("");

  function handleSave() {
    // TODO: save the project to the database after you implement it.
    console.log(`Saved project ${projectName}`);
    navigation.goBack();
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
