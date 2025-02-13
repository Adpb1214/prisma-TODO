"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem"; // Ensure this component exists
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  Paper,
  IconButton,
  Checkbox,
  Box,
} from "@mui/material";
import { Add, Edit, Delete, Save } from "@mui/icons-material";

export default function TodoPage() {
  const { data: session } = useSession();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [deadline, setDeadline] = useState<string>(""); // State for deadline input

  // ✅ Fetch Todos when session is ready
  useEffect(() => {
    if (session) fetchTodos();
  }, [session]);

  const fetchTodos = async () => {
    try {
      const res = await fetch("/api/todos");
      const data = await res.json();

      if (Array.isArray(data)) {
        setTodos(data.sort((a, b) => Number(a.completed) - Number(b.completed)));
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  // ✅ Add New Todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;
  
    if (deadline && new Date(deadline) < new Date()) {
      alert("Deadline cannot be in the past!");
      return;
    }
  
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTodo, deadline }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to create todo:", errorData.error);
        return;
      }
  
      setNewTodo("");
      setDeadline("");
      fetchTodos();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // ✅ Toggle Todo Completion
  const toggleTodo = async (id: string, completed: boolean) => {
    await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTodos();
  };

  // ✅ Delete Todo
  const deleteTodo = async (id: string) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    fetchTodos();
  };

  // ✅ Start Editing
  const startEditing = (id: string, title: string) => {
    setEditingId(id);
    setEditText(title);
  };

  // ✅ Save Edited Todo
  const saveEdit = async (id: string) => {
    await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editText }),
    });
    setEditingId(null);
    fetchTodos();
  };

  // ✅ Drag & Drop Handling
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex((todo) => todo.id === active.id);
    const newIndex = todos.findIndex((todo) => todo.id === over.id);

    const newOrder = arrayMove(todos, oldIndex, newIndex);
    setTodos(newOrder);
  };

  return (
    <div style={{height: "100vh"}} className="flex justify-center items-center">

<Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          bgcolor: "rgba(255, 255, 255, 0.1)", // Glassmorphism effect
          backdropFilter: "blur(10px)",
          borderRadius: 3,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#fff",
            textShadow: "1px 1px 5px rgba(0, 0, 0, 0.3)",
          }}
        >
          🚀 My Todo List
        </Typography>

        {/* Input */}
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            sx={{ bgcolor: "#fff", borderRadius: 2 }}
          />
          <TextField
            type="date"
            variant="outlined"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ bgcolor: "#fff", borderRadius: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              addTodo();
              alert("Task added successfully!");
            }}
            startIcon={<Add />}
            sx={{
              borderRadius: 2,
              bgcolor: "#4CAF50",
              ":hover": { bgcolor: "#388E3C" },
            }}
          >
            Add
          </Button>
        </Box>

        {/* Drag & Drop Context */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={todos.map((todo) => todo.id)} strategy={verticalListSortingStrategy}>
            <List>
              {todos.map((todo) => (
                <SortableItem
                  key={todo.id}
                  todo={todo}
                  editingId={editingId}
                  editText={editText}
                  toggleTodo={toggleTodo}
                  startEditing={startEditing}
                  saveEdit={saveEdit}
                  deleteTodo={deleteTodo}
                  setEditText={setEditText}
                />
              ))}
            </List>
          </SortableContext>
        </DndContext>
      </Paper>
    </Container>

    </div>
    
  );
}
