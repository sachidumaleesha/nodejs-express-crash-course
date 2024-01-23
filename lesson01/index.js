const express = require('express')

const app = express()

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Application run on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.json({"message" : "Hay Hi"})
})

app.get('/users', (req, res) => {
    res.json({"message" : "Get ALL Users"})
})

app.get('/users/:id', (req, res) => {
    res.json({"message" : `Get User with id ${req.params.id}`})
})

app.post('/users', (req, res) => {
    res.json({"message" : "Create new user"})
})

app.put('/users/:id', (req, res) => {
    res.json({"message" : `Update User with id ${req.params.id}`})
})

app.delete('/users/:id', (req, res) => {
    res.json({"message" : `Delete User with id ${req.params.id}`})
})