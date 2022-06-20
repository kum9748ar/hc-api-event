# hc-api-event

An API

## Import Modules

```
const express = require('express');
const mongoose = require('mongoose');
const app = express()
app.use(express.json())
require('dotenv').config();
```

## Create a schema & Model

```
const todoSchema = mongoose.Schema({
    todo: String
})
const Todo = mongoose.model('Todo', todoSchema)
```
## Create the Requests 
```

app.get('/', async (req, res) => {
    const data = await Todo.find();
    res.json(data)
})
app.post('/', async (req, res) => {
    const data = await Todo.create(req.body);
    res.send(data)
})
app.get('/:id', async (req, res) => {
    const data = await Todo.findById(req.params.id);
    res.json(data)
})


app.put('/:id', async (req, res) => {
    const data = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(data)
})

app.delete("/:id", async (req, res) => {
    const data = await Todo.findByIdAndDelete(req.params.id)
    res.send("Todo deleted")
})

```

## Start The server

```
const start = () => {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(
        app.listen(5000, () => {
            console.log("App is listining ");
        })
    ).catch((err) => {
        console.log("Error ")
    })

}
start()
```
