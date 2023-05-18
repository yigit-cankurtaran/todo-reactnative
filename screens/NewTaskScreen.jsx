export default function NewTaskScreen() {
  const theme = useTheme();
  const [taskName, setTaskName] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { projectId, taskId, tasks } = route.params;
  console.log(`Project id: ${projectId}`);
  console.log(`Task id: ${taskId}`);

  function saveTask() {
    const newTask = {
      id: Date.now().toString(),
      name: taskName,
      done: false,
    };
    let updatedTasks = [...tasks, newTask];
    AsyncStorage.setItem(`@tasks_${projectId}`, JSON.stringify(updatedTasks));
    console.log(`Tasks: ${JSON.stringify(tasks)}`);
    console.log(`Updated tasks: ${JSON.stringify(updatedTasks)}`);
    console.log(`Task ${newTask.name} with id ${newTask.id} saved.`);
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
        onPress={saveTask}
        buttonColor={theme.colors.primary}
      >
        Save
      </Button>
    </View>
  );
}
