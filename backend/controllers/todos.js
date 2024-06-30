const Todo = require("../models/todo");
const User = require("../models/user");
const { createTodo, updateTodo } = require("../types");

// Create todos
exports.createTodo = async (req, res) => {
  try {
    // get the title and desc
    const { title, description } = req.body;

    // Validate the inputs
    const validatedInputs = createTodo.safeParse({ title, description });

    if (!validatedInputs.success) {
      return res.status(400).json({
        success: false,
        msg: "Invalid inputs",
      });
    }

    // Save it in DB
    const todo = await Todo.create({ title: title, description: description });

    // update the user with the Id of the todo created
    await User.findByIdAndUpdate(
      { _id: req.user.id },
      {
        $push: {
          todos: todo._id,
        },
      },
      { new: true }
    );

    // return res
    res.status(200).json({
      success: true,
      msg: "Todo created successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

// Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    // get all todos created by user
    const user = await User.findById({ _id: req.user.id }).populate("todos");

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // return res
    res.status(200).json({
      success: true,
      data: user.todos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

// Update todo
exports.updateTodo = async (req, res) => {
  try {
    // get the Id of the todo that needs to be updated
    const { id } = req.body;

    // validate the ID
    const validatedInputs = updateTodo.safeParse({ id });
    if (!validatedInputs.success) {
      return res.status(400).json({
        success: false,
        msg: "Invalid ID",
      });
    }

    // update the todo
    await Todo.updateOne({ _id: id }, { completed: true });

    // shyd completed todo ko remove karna pade

    // Send res
    res.status(200).json({
      success: true,
      msg: "Todo marked as complete",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
