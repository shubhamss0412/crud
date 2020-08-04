const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//mtodo_iddleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { name, number, price } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (name,number,price) VALUES($1) RETURNING *",
      [name, number, price]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:todo_id", async (req, res) => {
  try {
    const { todo_id } = req.params;
    const todo = await pool.query(
      "SELECT * FROM todo WHERE todo_todo_id = $1",
      [todo_id]
    );

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:todo_id", async (req, res) => {
  try {
    const { todo_id } = req.params;
    const { name, number, price } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET name,number,price = $1 WHERE todo_todo_id = $2",
      [name, number, price, todo_id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:todo_id", async (req, res) => {
  try {
    const { todo_id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todo WHERE todo_todo_id = $1",
      [todo_id]
    );
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
