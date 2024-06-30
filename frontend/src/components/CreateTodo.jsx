import React, { useState } from "react";
import { createTodo } from "../services/operations/todoApi";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../store/atoms";
import { useNavigate } from "react-router-dom";

const CreateTodo = () => {
  const [formData, setFormdata] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const token = useRecoilValue(tokenAtom);
  const navigate = useNavigate();

  function handleChange(event) {
    setFormdata((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    try {
      await createTodo(formData.title, formData.description, token);

      setFormdata({
        title: "",
        description: "",
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Enter title</p>
          <input
            required
            type="text"
            value={formData.title}
            placeholder="Enter Title"
            name="title"
            onChange={handleChange}
          />
        </label>
        <label>
          <p>Enter description</p>
          <input
            required
            type="text"
            value={formData.description}
            placeholder="Enter description"
            name="description"
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit" disabled={loading} style={{ marginTop: "10px" }}>
          Create Todo
        </button>
      </form>

      <div
        style={{ cursor: "pointer", color: "blueviolet", marginTop: "10px" }}
        onClick={() => navigate("/allTodos")}
      >
        See Your Todos
      </div>
    </div>
  );
};

export default CreateTodo;
