import AsyncStorage from "@react-native-async-storage/async-storage";

const TASKS_STORAGE_KEY = "smart-kit:tasks:v1";

export type ChecklistTask = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

function isChecklistTask(value: unknown): value is ChecklistTask {
  if (!value || typeof value !== "object") {
    return false;
  }

  const task = value as Partial<ChecklistTask>;

  return (
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    typeof task.completed === "boolean" &&
    typeof task.createdAt === "string" &&
    typeof task.updatedAt === "string"
  );
}

export async function loadTasks() {
  const rawTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);

  if (!rawTasks) {
    return [];
  }

  const parsedTasks: unknown = JSON.parse(rawTasks);

  if (!Array.isArray(parsedTasks)) {
    return [];
  }

  return parsedTasks.filter(isChecklistTask);
}

export async function saveTasks(tasks: ChecklistTask[]) {
  await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

export function createTask(title: string): ChecklistTask {
  const timestamp = new Date().toISOString();

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    completed: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}
