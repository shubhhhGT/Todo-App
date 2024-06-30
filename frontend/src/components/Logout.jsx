import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { compltedTodosAtom, tokenAtom } from "../store/atoms";

const Logout = () => {
  const navigate = useNavigate();
  const setToken = useSetRecoilState(tokenAtom);
  const setCompletedTodoIds = useSetRecoilState(compltedTodosAtom);

  function handleClick() {
    // Set the token in the atom and localstorage as null
    setToken(null);
    setCompletedTodoIds([]);
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <div
      onClick={handleClick}
      style={{
        color: "blueviolet",
        fontSize: "20px",
        fontWeight: "bold",
        cursor: "pointer",
        display: "flex",
        marginTop: "20px",
      }}
    >
      Logout
    </div>
  );
};

export default Logout;
