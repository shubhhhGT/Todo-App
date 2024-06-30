import { apiConnector } from "../apiConnector";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createTodo = async (title, description, token) => {
  try {
    await apiConnector(
      "POST",
      `${BASE_URL}/todo`,
      {
        title,
        description,
      },
      { Authorization: `Bearer ${token}` }
    );

    console.log("Todo created successfully");
  } catch (error) {
    console.log("Create TODO api error...", error);
  }
};

export const getAllTodos = async (token) => {
  try {
    const todos = await apiConnector("GET", `${BASE_URL}/todos`, null, {
      Authorization: `Bearer ${token}`,
    });

    if (todos) {
      return todos.data.data;
    } else {
      throw new Error("Error getting All todos");
    }
  } catch (error) {
    console.log("Get all todos error...", error);
  }
};

export const markAsComplete = async (id, token) => {
  try {
    await apiConnector(
      "PUT",
      `${BASE_URL}/completed`,
      { id },
      { Authorization: `Bearer ${token}` }
    );

    console.log("Todo marked as complete!");
  } catch (error) {
    console.log("Upadate Todo Error...", error);
  }
};
