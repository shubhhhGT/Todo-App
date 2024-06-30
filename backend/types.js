const zod = require("zod");

const credentials = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const createTodo = zod.object({
  title: zod.string(),
  description: zod.string(),
});

const updateTodo = zod.object({
  id: zod.string(),
});

module.exports = { credentials, createTodo, updateTodo };
