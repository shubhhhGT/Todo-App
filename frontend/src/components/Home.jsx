import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h3>Welcome to Homepage.</h3>
      <p>
        You might want to{" "}
        <span
          onClick={() => navigate("/login")}
          style={{ color: "blueviolet", cursor: "pointer" }}
        >
          login
        </span>
      </p>
    </div>
  );
};

export default Home;
