import { apiConnector } from "../apiConnector";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function login(username, password) {
  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );

    // If there is an error
    if (response.status === 200) {
      // set token in localstorage
      localStorage.setItem("token", JSON.stringify(response.data.data));

      return response.data.data;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.log("Login Error...", error);
  }
}

export async function signup(username, password) {
  try {
    const response = await apiConnector("POST", `${BASE_URL}/signup`, {
      username,
      password,
    });

    // If there is an error
    if (!response.status) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("Signup Error...", error);
  }
}
