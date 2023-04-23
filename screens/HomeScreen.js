import React, { useEffect, useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { List, Divider, FAB, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const [projects, setProjects] = useState([]);
  const [shouldFetchProjects, setShouldFetchProjects] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProjects = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const projects = await AsyncStorage.multiGet(keys);

      setProjects(projects.map(([key, value]) => JSON.parse(value)));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (shouldFetchProjects) {
      fetchProjects();
      setShouldFetchProjects(false);
    }
  }, [shouldFetchProjects]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchProjects().then(() => setRefreshing(false));
  }, []);

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

  function handleNewProject() {
    navigation.navigate("NewProject", {
      onGoBack: () => fetchProjects(),
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={projects}
        renderItem={renderItem}
        keyExtractor={(item) => (item.id ? item.id.toString() : "")}
        // the above line might be problematic, if so just change the ternary part into just toString()
        ItemSeparatorComponent={() => <Divider />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {/* the above line might be problematic, if so just change the divider part into an arrow function */}
      <FAB
        style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
        icon="plus"
        onPress={() => handleNewProject()}
        color={theme.colors.surface}
      />
    </View>
  );
}
