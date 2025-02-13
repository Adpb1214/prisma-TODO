"use client"
import { useState } from "react";
import { trpc } from "trpc/router";
// import { trpc } from "../utils/trpc";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const utils = trpc.useContext();
  const createTodo = trpc.todo.create.useMutation({
    onSuccess: () => {
      utils.todo.getAll.invalidate();
      setTitle("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTodo.mutate({ title });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        placeholder="Add a new todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mr-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}