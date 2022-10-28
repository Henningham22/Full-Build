const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/mern-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB"))
    .catch(err => console.error(err));

const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
});

app.post('/todo/new', async (req, res) => {
    try {
        const todo = await Todo.create(req.body);

        res.status(201).json(todo);
    } catch (err) {
        console.error(err);
    }
});

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.put('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req, params, id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
})

app.listen(3001, () => console.log("server started on port 3001"));