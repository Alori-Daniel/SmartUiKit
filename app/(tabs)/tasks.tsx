import CustomShell from "@/components/CustomShell";
import { fonts } from "@/constants/fonts";
import {
  ChecklistTask,
  createTask,
  loadTasks,
  saveTasks,
} from "@/services/taskStorage";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function TasksScreen() {
  const [tasks, setTasks] = useState<ChecklistTask[]>([]);
  const [draftTitle, setDraftTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [hasLoadedTasks, setHasLoadedTasks] = useState(false);
  const [storageMessage, setStorageMessage] = useState("Saved");

  const completedCount = tasks.filter((task) => task.completed).length;
  const openCount = tasks.length - completedCount;

  useEffect(() => {
    let isMounted = true;

    loadTasks()
      .then((savedTasks) => {
        if (!isMounted) {
          return;
        }

        setTasks(savedTasks);
        setHasLoadedTasks(true);
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setStorageMessage("Could not load saved tasks");
        setHasLoadedTasks(true);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hasLoadedTasks) {
      return;
    }

    saveTasks(tasks)
      .then(() => setStorageMessage("Saved"))
      .catch(() => setStorageMessage("Could not save latest changes"));
  }, [hasLoadedTasks, tasks]);

  function handleAddTask() {
    const nextTitle = draftTitle.trim();

    if (!nextTitle) {
      return;
    }

    setTasks((currentTasks) => [createTask(nextTitle), ...currentTasks]);
    setDraftTitle("");
  }

  function handleToggleTask(taskId: string) {
    const timestamp = new Date().toISOString();

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed, updatedAt: timestamp }
          : task,
      ),
    );
  }

  function handleStartEditing(task: ChecklistTask) {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  }

  function handleSaveEditing() {
    const nextTitle = editingTitle.trim();

    if (!editingTaskId || !nextTitle) {
      return;
    }

    const timestamp = new Date().toISOString();

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === editingTaskId
          ? { ...task, title: nextTitle, updatedAt: timestamp }
          : task,
      ),
    );
    setEditingTaskId(null);
    setEditingTitle("");
  }

  function handleCancelEditing() {
    setEditingTaskId(null);
    setEditingTitle("");
  }

  function handleDeleteTask(taskId: string) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );

    if (editingTaskId === taskId) {
      handleCancelEditing();
    }
  }

  return (
    <CustomShell>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroCard}>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{tasks.length}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{openCount}</Text>
                <Text style={styles.statLabel}>Open</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{completedCount}</Text>
                <Text style={styles.statLabel}>Done</Text>
              </View>
            </View>
          </View>

          <View style={styles.addCard}>
            <Text style={styles.sectionLabel}>New Task</Text>
            <View style={styles.addRow}>
              <TextInput
                value={draftTitle}
                onChangeText={setDraftTitle}
                onSubmitEditing={handleAddTask}
                placeholder="e.g. Buy rice after checking weight"
                placeholderTextColor="#9AA5B1"
                returnKeyType="done"
                style={styles.addInput}
              />

              <Pressable onPress={handleAddTask} style={styles.addButton}>
                <Ionicons name="add" size={22} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>

          <View style={styles.taskSection}>
            <View style={styles.taskHeader}>
              <Text style={styles.sectionTitle}>Checklist</Text>
              <Text style={styles.storageLabel}>{storageMessage}</Text>
            </View>

            {tasks.length === 0 ? (
              <View style={styles.emptyCard}>
                <Ionicons name="clipboard-outline" size={28} color="#0D5DB8" />
                <Text style={styles.emptyTitle}>No tasks yet</Text>
                <Text style={styles.emptyCopy}>
                  Create your first checklist item and it will stay available
                  offline.
                </Text>
              </View>
            ) : (
              tasks.map((task) => {
                const isEditing = editingTaskId === task.id;

                return (
                  <View key={task.id} style={styles.taskCard}>
                    <Pressable
                      onPress={() => handleToggleTask(task.id)}
                      style={[
                        styles.checkbox,
                        task.completed && styles.checkboxCompleted,
                      ]}
                    >
                      {task.completed ? (
                        <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                      ) : null}
                    </Pressable>

                    <View style={styles.taskBody}>
                      {isEditing ? (
                        <TextInput
                          value={editingTitle}
                          onChangeText={setEditingTitle}
                          onSubmitEditing={handleSaveEditing}
                          autoFocus
                          returnKeyType="done"
                          style={styles.editInput}
                        />
                      ) : (
                        <Text
                          style={[
                            styles.taskTitle,
                            task.completed && styles.taskTitleCompleted,
                          ]}
                        >
                          {task.title}
                        </Text>
                      )}

                      <Text style={styles.taskMeta}>
                        {task.completed ? "Completed" : "Tap circle when done"}
                      </Text>
                    </View>

                    <View style={styles.taskActions}>
                      {isEditing ? (
                        <>
                          <Pressable
                            onPress={handleSaveEditing}
                            style={styles.actionButton}
                          >
                            <Ionicons
                              name="checkmark"
                              size={18}
                              color="#0D5DB8"
                            />
                          </Pressable>
                          <Pressable
                            onPress={handleCancelEditing}
                            style={styles.actionButton}
                          >
                            <Ionicons name="close" size={18} color="#6B7280" />
                          </Pressable>
                        </>
                      ) : (
                        <Pressable
                          onPress={() => handleStartEditing(task)}
                          style={styles.actionButton}
                        >
                          <Ionicons
                            name="create-outline"
                            size={18}
                            color="#0D5DB8"
                          />
                        </Pressable>
                      )}

                      <Pressable
                        onPress={() => handleDeleteTask(task.id)}
                        style={styles.actionButton}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={18}
                          color="#D04A3A"
                        />
                      </Pressable>
                    </View>
                  </View>
                );
              })
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </CustomShell>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 28,
    gap: 18,
  },
  heroCard: {
    backgroundColor: "#0D5DB8",
    borderRadius: 28,
    paddingHorizontal: 22,
    paddingVertical: 24,
    gap: 14,
    shadowColor: "#0D5DB8",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 6,
  },
  heroBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.14)",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  heroBadgeText: {
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fonts.bold,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    lineHeight: 34,
    fontFamily: fonts.extraBold,
  },
  heroCopy: {
    color: "#DCEBFF",
    fontSize: 15,
    lineHeight: 22,
    fontFamily: fonts.medium,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.13)",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 22,
    lineHeight: 28,
    fontFamily: fonts.extraBold,
  },
  statLabel: {
    color: "#CFE3FF",
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.bold,
  },
  addCard: {
    backgroundColor: "#F3F5FA",
    borderRadius: 22,
    padding: 16,
    gap: 12,
  },
  sectionLabel: {
    color: "#8A94A3",
    fontSize: 11,
    lineHeight: 16,
    fontFamily: fonts.bold,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  addInput: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    color: "#102542",
    fontSize: 15,
    lineHeight: 22,
    fontFamily: fonts.semiBold,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#0D5DB8",
    alignItems: "center",
    justifyContent: "center",
  },
  taskSection: {
    gap: 12,
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  sectionTitle: {
    color: "#102542",
    fontSize: 18,
    lineHeight: 26,
    fontFamily: fonts.extraBold,
  },
  storageLabel: {
    color: "#7D8793",
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.semiBold,
    textAlign: "right",
  },
  emptyCard: {
    alignItems: "center",
    borderRadius: 22,
    backgroundColor: "#F3F5FA",
    paddingHorizontal: 20,
    paddingVertical: 26,
    gap: 8,
  },
  emptyTitle: {
    color: "#102542",
    fontSize: 18,
    lineHeight: 24,
    fontFamily: fonts.extraBold,
  },
  emptyCopy: {
    color: "#627181",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fonts.medium,
    textAlign: "center",
  },
  taskCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    borderRadius: 22,
    backgroundColor: "#F3F5FA",
    padding: 14,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#0D5DB8",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  checkboxCompleted: {
    backgroundColor: "#0D5DB8",
  },
  taskBody: {
    flex: 1,
    gap: 4,
  },
  taskTitle: {
    color: "#102542",
    fontSize: 16,
    lineHeight: 22,
    fontFamily: fonts.bold,
  },
  taskTitleCompleted: {
    color: "#7D8793",
    textDecorationLine: "line-through",
  },
  taskMeta: {
    color: "#7D8793",
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.medium,
  },
  editInput: {
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    color: "#102542",
    fontSize: 16,
    lineHeight: 22,
    fontFamily: fonts.bold,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  taskActions: {
    flexDirection: "row",
    gap: 6,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
