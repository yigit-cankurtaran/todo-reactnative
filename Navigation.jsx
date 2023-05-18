const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Project" component={ProjectScreen} />
        <Stack.Screen name="New Project" component={NewProjectScreen} />
        <Stack.Screen name="New Task" component={NewTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
