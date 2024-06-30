const express = require("express");
const router = express.Router();

// gert the controllers and the middlewares
const { signup, login } = require("../controllers/auth");
const { createTodo, getAllTodos, updateTodo } = require("../controllers/todos");
const { auth } = require("../middlewares/auth");

router.post("/signup", signup);
router.post("/login", login);

router.post("/todo", auth, createTodo);
router.get("/todos", auth, getAllTodos);
router.put("/completed", auth, updateTodo);

module.exports = router;
