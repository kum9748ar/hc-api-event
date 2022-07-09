/*Importing the moudule*/
const express = require('express');
const mongoose = require('mongoose');
const app = express()
app.use(express.json())
const { auth } = require('express-openid-connect');

const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'zY1crs0BQORHeSTMefVgbxC54rbshZe0',
    issuerBaseURL: 'https://dev-d18-ir07.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


require('dotenv').config();

// Mongodb Schema & Model 
const todoSchema = mongoose.Schema({
    todo: String
})
const Todo = mongoose.model('Todo', todoSchema)


//api requests 

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



const start = () => {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(
        app.listen(3000, () => {
            console.log("App is listining ");
        })
    ).catch((err) => {
        console.log("Error ")
    })
}
start()