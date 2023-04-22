import React from "react";
import { View, FlatList } from "react-native";
import { List, Divider, FAB, useTheme } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const projects = [
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
    { id: 3, name: "Project 3" },
  ];

  function renderItem({ item }) {
    return (
      <List.Item
        title={item.name}
        onPress={() =>
          navigation.navigate("Project", { id: item.id, name: item.name })
        }
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={projects}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={Divider}
      />
      {/* the above line might be problematic, if so just change the divider part into an arrow function */}
      <FAB
        style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
        icon="plus"
        onPress={() => navigation.navigate("NewProject")}
        color={theme.colors.surface}
      />
    </View>
  );
}
