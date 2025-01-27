import { ref } from "vue";

export function useTodo() {
  const tasks = ref([
    { id: 1, title: "タスク1", completed: false },
    { id: 2, title: "タスク2", completed: false },
  ]);

  const addTask = (title: string) => {
    tasks.value.push({
      id: Date.now(),
      title,
      completed: false,
    });
  };

  const deleteTask = (taskId: number) => {
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
  };

  const toggleTask = (taskId: number) => {
    const task = tasks.value.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  };

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
  };
}
