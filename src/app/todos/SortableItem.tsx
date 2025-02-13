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
  
    {/* Deadline Alerts */}
    {isDeadlineClose && !todo.completed && (
      <Chip
        label="Time Running Out!"
        color="warning"
        className="ml-2"
        sx={{ backgroundColor: "#FFA500", color: "#FFF" }} // Custom orange color
      />
    )}
  
    {isDeadlinePassed && !todo.completed && (
      <Chip
        label="Deadline Passed Already"
        color="error"
        className="ml-2"
        sx={{ backgroundColor: "#FF0000", color: "#FFF" }} // Custom red color
      />
    )}
  
    {/* Edit / Save button */}
    <Box className="ml-2 flex gap-2">
      {editingId === todo.id ? (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            saveEdit(todo.id);
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
        }}
        color="error"
      >
        <Delete />
      </IconButton>
    </Box>
  </ListItem>
  );
}