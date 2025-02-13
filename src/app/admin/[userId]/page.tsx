// app/admin/[userId]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserDetailsPage({ params }: { params: { userId: string } }) {
  const { userId } = params;  // Get userId from the URL params
  const [todos, setTodos] = useState<any[]>([]);  // State to hold todos (tasks)
  const [loading, setLoading] = useState<boolean>(true);
  const [editingId, setEditingId] = useState<string | null>(null);  // Track which task is being edited
  const [editedTitle, setEditedTitle] = useState<string>("");  // Track the edited title
  const [editedCompleted, setEditedCompleted] = useState<boolean>(false);  // Track the completion status

  useEffect(() => {
    const fetchTasks = async () => {
      try {
     const res = await fetch(`/api/users/${userId}`); // ✅ Corrected

        if (!res.ok) throw new Error("Failed to fetch user tasks");
        const data = await res.json();
        console.log("Fetched user tasks:", data);
        setTodos(data);  // Set the tasks (todos) into state
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  const handleEdit = (taskId: string, currentTitle: string, currentCompleted: boolean) => {
    setEditingId(taskId);
    setEditedTitle(currentTitle);
    setEditedCompleted(currentCompleted);
  };

  // const handleSave = async (taskId: string) => {
  //   try {
  //     const res = await fetch(`/api/todos/${taskId}`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ title: editedTitle, completed: editedCompleted }),
  //     });
  //     const updatedTask = await res.json();
  //     if (res.ok) {
  //       setTodos((prevTodos) =>
  //         prevTodos.map((todo) =>
  //           todo.id === taskId ? updatedTask : todo
  //         )
  //       );
  //       setEditingId(null);  // Clear editing state
  //     } else {
  //       alert("Failed to update task.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating task:", error);
  //   }
  // };

  // const handleDelete = async (taskId: string) => {
  //   try {
  //     const res = await fetch(`/api/todos/${taskId}`, {
  //       method: "DELETE",
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== taskId));
  //     } else {
  //       alert("Failed to delete task.");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting task:", error);
  //   }
  // };

  if (loading) return <p>Loading tasks...</p>;

  if (todos.length === 0) return <p>No tasks found for this user.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">User Tasks</h1>
      <ul>
        {todos.map((task: any) => (
          <li key={task.id} className="border-b p-2">
            {editingId === task.id ? (
              <div>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="border p-2 mr-2"
                />
                <label className="mr-2">Completed</label>
                <input
                  type="checkbox"
                  checked={editedCompleted}
                  onChange={(e) => setEditedCompleted(e.target.checked)}
                  className="mr-2"
                />
                <button
                  // onClick={() => handleSave(task.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p className="font-semibold">{task.title}</p>
                <p>Status: {task.completed ? "Completed" : "Pending"}</p>
                <button
                  onClick={() => handleEdit(task.id, task.title, task.completed)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  // onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

