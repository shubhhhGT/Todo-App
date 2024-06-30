import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { compltedTodosAtom, tokenAtom } from "../store/atoms";
import { getAllTodos, markAsComplete } from "../services/operations/todoApi";

const AllTodos = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodosId, setCompletedTodoIds] =
    useRecoilState(compltedTodosAtom);

  const token = useRecoilValue(tokenAtom);

  useEffect(() => {
    const getTodos = async () => {
      const allTodos = await getAllTodos(token);
      setTodos(allTodos);
      const completedIds = allTodos
        .filter((todo) => todo.completed)
        .map((todo) => todo._id);

      // Set completed todos in the atom so that in case of hard refresh we get the completed todos as it is
      setCompletedTodoIds(completedIds);
    };

    getTodos();
  }, [token]);

  const clickHandler = async (id) => {
    await markAsComplete(id, token);
    setCompletedTodoIds((prevTodoIds) => {
      const updatedIds = [...prevTodoIds, id];
      return updatedIds;
    });
  };

  return (
    <>
      {todos.map((todo) => (
        <div key={todo._id}>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <button
            disabled={completedTodosId.includes(todo._id)}
            onClick={() => clickHandler(todo._id)}
          >
            {completedTodosId.includes(todo._id)
              ? "completed"
              : "Mark as Complete"}
          </button>
        </div>
      ))}
    </>
  );
};

export default AllTodos;
