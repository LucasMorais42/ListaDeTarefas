import React, { useState, useReducer } from "react";
import { StatusBar } from "expo-status-bar";

import { Task } from "../ListaDeTarefas/types/Task";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";

type State = {
  tasks: Task[];
};

type Action =
  | {
      type: "add-new-task";
      inputValue: string;
    }
  | {
      type: "toggle-task";
      id: number;
    }
  | {
      type: "delete-done";
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "add-new-task":
      return {
        tasks: [
          ...state.tasks,
          {
            id: Date.now(),
            name: action.inputValue,
            completed: false,
            selected: false,
          },
        ],
      };

    case "toggle-task":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.id
            ? {
                ...task,
                completed: !task.completed,
              }
            : task,
        ),
      };

    case "delete-done":
      return {
        tasks: state.tasks.filter((task) => !task.completed),
      };

    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    tasks: [],
  });

  const [inputValue, setInputValue] = useState<string>("");

  const handleAddTask = () => {
    if (!inputValue.trim()) return;

    dispatch({
      type: "add-new-task",
      inputValue,
    });

    setInputValue("");
  };

  const deleteDoneTasks = () => {
    dispatch({
      type: "delete-done",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Lista de Tarefas</Text>

      <Text style={styles.counter}>Total de tarefas: {state.tasks.length}</Text>

      <View style={styles.inline}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma tarefa..."
          placeholderTextColor="#ccc"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />

        <Button title="Adicionar" onPress={handleAddTask} />
      </View>

      <ScrollView style={styles.tasksContainer}>
        {state.tasks.map((task: Task) => (
          <TouchableOpacity
            key={task.id}
            onPress={() =>
              dispatch({
                type: "toggle-task",
                id: task.id,
              })
            }
            style={[
              styles.taskCard,
              {
                backgroundColor: task.completed ? "#4CAF50" : "#5450D6",
              },
            ]}
          >
            <Text
              style={[
                styles.taskText,
                {
                  textDecorationLine: task.completed ? "line-through" : "none",

                  opacity: task.completed ? 0.7 : 1,
                },
              ]}
            >
              {task.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.deleteButton}>
        <Button
          title="Deletar concluídas"
          onPress={deleteDoneTasks}
          color="#E53935"
        />
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4939BA",
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },

  counter: {
    color: "white",
    fontSize: 16,
    marginBottom: 20,
  },

  inline: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    gap: 10,
  },

  input: {
    flex: 1,
    borderColor: "#fff",
    borderWidth: 1,
    backgroundColor: "#5450D6",
    color: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  tasksContainer: {
    width: "100%",
  },

  taskCard: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  taskText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },

  deleteButton: {
    width: "100%",
    marginTop: 10,
    marginBottom: 30,
  },
});
