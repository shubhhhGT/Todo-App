import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/operations/authApi";

const Signup = () => {
  const [formData, setFormdata] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    // Prevent the default event behavior
    event.preventDefault();

    // Api call
    setLoading(true);
    await signup(formData.username, formData.password);
    setFormdata({
      username: "",
      signup: "",
    });
    navigate("/login");
    setLoading(false);
  }

  function changeHandler(event) {
    setFormdata((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

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
          {loading ? "Loading" : "SignUp"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
