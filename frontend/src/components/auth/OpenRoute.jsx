import React from "react";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../store/atoms";
import { Navigate } from "react-router-dom";

const OpenRoute = ({ children }) => {
  const token = useRecoilValue(tokenAtom);

  if (token === null) {
    return children;
  } else {
    return <Navigate to={"/createTodo"} />;
  }
};

export default OpenRoute;
