"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react"; // Icon for dragging
import {
  Checkbox,
  IconButton,
  TextField,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Chip,
  Typography,
} from "@mui/material";
import { Edit, Save, Delete } from "@mui/icons-material";
import { format, differenceInDays, isBefore } from "date-fns"; // For date formatting and calculations

export default function SortableItem({
  todo,
  editingId,
  editText,
  toggleTodo,
  startEditing,
  saveEdit,
  deleteTodo,
  setEditText,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Calculate if the deadline is within 2 days
  const isDeadlineClose =
    todo.deadline && differenceInDays(new Date(todo.deadline), new Date()) <= 2;

  // Check if the deadline has already passed
  const isDeadlinePassed =
    todo.deadline && isBefore(new Date(todo.deadline), new Date());

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      className={`mb-2 rounded-lg shadow-md transition-all ${
        todo.completed ? "bg-gray-200 opacity-70" : "bg-white"
      } ${isDeadlineClose && !todo.completed ? "border-2 border-red-500" : ""}`} // Add red border if deadline is close
      sx={{ padding: 2, marginBottom: 2 }} // Increase padding and margin
    >
      {/* Drag handle */}
      <ListItemIcon
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="text-gray-500" />
      </ListItemIcon>

      {/* Checkbox */}
      <Checkbox
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id, todo.completed)}
        color="primary"
      />

      {/* Editable input or normal text */}
      {editingId === todo.id ? (
        <TextField
          fullWidth
          variant="outlined"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-grow"
        />
      ) : (
        <ListItemText
          primary={todo.title}
          secondary={
            todo.deadline
              ? `Deadline: ${format(new Date(todo.deadline), "MMM dd, yyyy")}`
              : ""
          } // Display deadline
          className={`flex-grow cursor-pointer ${
            todo.completed ? "text-gray-400 line-through" : "text-black"
          }`}
          onClick={() => toggleTodo(todo.id, todo.completed)}
        />
      )}

      {/* Status Tags */}
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        {todo.completed ? (
          <Chip
            label="Completed"
            color="success"
            sx={{ backgroundColor: "#4CAF50", color: "#FFF" }}
          />
        ) : isDeadlinePassed ? (
          <Chip
            label="Deadline Passed"
            color="error"
            sx={{ backgroundColor: "#FF0000", color: "#FFF" }}
          />
        ) : (
          <Chip
            label="In Progress"
            color="info"
            sx={{ backgroundColor: "#2196F3", color: "#FFF" }}
          />
        )}
      </Box>

      {/* Edit / Save button */}
      <Box className="ml-2 flex gap-2">
        {editingId === todo.id ? (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              saveEdit(todo.id);
              alert("Todo updated successfully!");
            }}
            color="primary"
          >
            <Save />
          </IconButton>
        ) : (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              startEditing(todo.id, todo.title);
            }}
            color="secondary"
          >
            <Edit />
          </IconButton>
        )}

        {/* Delete button */}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
            alert("Todo deleted successfully!");
          }}
          color="error"
        >
          <Delete />
        </IconButton>
      </Box>
    </ListItem>
  );
}