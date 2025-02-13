// import { trpc } from "../utils/trpc";

import { trpc } from "trpc/router";

export default function TodoList() {
  const { data: todos, isLoading } = trpc.todo.getAll.useQuery();
  const utils = trpc.useContext();
  const updateTodo = trpc.todo.update.useMutation({
    onSuccess: () => utils.todo.getAll.invalidate(),
  });
  const deleteTodo = trpc.todo.delete.useMutation({
    onSuccess: () => utils.todo.getAll.invalidate(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {todos?.map((todo) => (
        <li key={todo.id} className="mb-4 p-4 border rounded flex justify-between items-center">
          <div>
            <h2 className={`text-xl ${todo.completed ? "line-through" : ""}`}>{todo.title}</h2>
            <p>{new Date(todo.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateTodo.mutate({ id: todo.id, completed: !todo.completed })}
              className="mr-2"
            />
            <button
              onClick={() => deleteTodo.mutate({ id: todo.id })}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}