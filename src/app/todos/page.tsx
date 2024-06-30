"use client";

import type { NewTodo, Todo } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const TodosPage = () => {
  const queryClient = useQueryClient();
  const [addTodo, setAddTodo] = useState<NewTodo>({ title: "", contents: "" });

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/practice");
      const { todos } = await response.json();

      console.log(todos);

      return todos;
    },
  });

  const newTodoMutation = useMutation({
    mutationFn: async (newTodo: NewTodo) => {
      const response = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      const todo = await response.json();
      return todo;
    },
  });

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러~</div>;
  }

  return (
    <div>
      <h1>todo list</h1>

      <section className="p-6">
        <h2> 투두 추가하기 </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            newTodoMutation.mutate(addTodo, {
              onSuccess: () => {
                setAddTodo({ title: "", contents: "" });
                queryClient.invalidateQueries({
                  queryKey: ["todos"],
                });
              },
            });
          }}
        >
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={addTodo.title}
            onChange={(e) => setAddTodo({ ...addTodo, title: e.target.value })}
            className="text-black"
          />

          <label htmlFor="contents">내용</label>
          <input
            type="text"
            id="contents"
            value={addTodo.contents}
            onChange={(e) =>
              setAddTodo({ ...addTodo, contents: e.target.value })
            }
            className="text-black"
          />

          <button type="submit"> 리스트 추가하기 </button>
        </form>
      </section>

      <section className="p-6">
        <h2> 추가된 리스트들 </h2>
        <ul>
          {todos.map((todo: Todo) => (
            <li className="border border-blue mb-4" key={todo.id}>
              <p>{todo.title}</p>
              <p>{todo.contents}</p>
              {todo.isDone ? <p> Done </p> : <p> Not Done </p>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TodosPage;
