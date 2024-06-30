import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/operations/authApi";
import { useSetRecoilState } from "recoil";
import { tokenAtom } from "../store/atoms";

const Login = () => {
  const navigate = useNavigate();
  const setToken = useSetRecoilState(tokenAtom);

  const [loading, setLoading] = useState(false);
  const [formData, setFormdata] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (event) => {
    setFormdata((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const token = await login(formData.username, formData.password);
      if (token) {
        setToken(token); // Set the token in Recoil state

        setLoading(false);
        setFormdata({
          username: "",
          password: "",
        });

        navigate("/createTodo");
      } else {
        throw new Error("Login failed. Token is not provided.");
      }
    } catch (error) {
      console.error("Login Error...", error);
      setLoading(false);
      // Optionally, you can show a user-friendly error message here
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input
            required
            type="text"
            placeholder="Enter Username"
            name="username"
            value={formData.username}
            onChange={changeHandler}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            required
            type="password"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </label>
        <button type="submit" disabled={loading} style={{ cursor: "pointer" }}>
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>
      <div>
        Haven't signed up?{" "}
        <span
          onClick={() => navigate("/signup")}
          style={{ color: "blueviolet", cursor: "pointer" }}
        >
          Sign Up
        </span>
      </div>
    </div>
  );
};

export default Login;
