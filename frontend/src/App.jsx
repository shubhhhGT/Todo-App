import { Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/signup";
import Home from "./components/Home";
import Login from "./components/login";
import CreateTodo from "./components/CreateTodo";
import OpenRoute from "./components/auth/OpenRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import AllTodos from "./components/AllTodos";
import Logout from "./components/Logout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="createTodo"
          element={
            <PrivateRoute>
              <CreateTodo />
              <Logout />
            </PrivateRoute>
          }
        />
        <Route
          path="allTodos"
          element={
            <PrivateRoute>
              <AllTodos />
              <Logout />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
