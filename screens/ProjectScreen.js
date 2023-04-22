import React from "react";
import { View, FlatList } from "react-native";
import { List, Divider, FAB, useTheme } from "react-native-paper";

export default function ProjectScreen({ route, navigation }) {
  const theme = useTheme();
  const { id, name } = route.params;
  const tasks = [
    { id: 1, name: "Task 1" },
    { id: 2, name: "Task 2" },
    { id: 3, name: "Task 3" },
  ];

  function renderItem({ item }) {
    return (
      <List.Item
        title={item.name}
        onPress={() =>
          navigation.navigate("NewTask", { id: item.id, name: item.name })
        }
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <List.Subheader>{name}</List.Subheader>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={Divider}
      />
      <FAB
        style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
        icon="plus"
        onPress={() => navigation.navigate("NewTask")}
        color={theme.colors.surface}
      />
    </View>
  );
}
