import express, { query } from  'express'

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

const users = [
    {id: 1, username: "Jack", displayName: "Jack"},
    {id: 2, username: "Mark", displayName: "Mark"},
    {id: 3, username: "Sofia", displayName: "Sofia"},
    {id: 4, username: "Stephan", displayName: "Stephan"},
    {id: 5, username: "Julia", displayName: "Julia"},
]

// to work this wen need route path and request handler that is {req, res}
app.get('/', (req, res) => {
    res.send('Say Hello')
})

// GET Requests
app.get('/api/users', (req, res) => {
    const {query: {filter, value}} = req

    if(!filter && !value) return res.send(users)

    if(filter && value){
        return res.send(
            users.filter((user) => user[filter].includes(value))
        )
    }

    res.send(users)
})

app.get('/api/users/:id', (req, res) => {
    // console.log(req)
    console.log(typeof req.params.id)
    const parsedId = parseInt(req.params.id)

    if(isNaN(parsedId)) return res.status(400).send({msg: 'Bad Request'})
    const findUser = users.find((user) => user.id === parsedId)
    if(!findUser) return res.sendStatus(404)
    res.send(findUser)
})

// POST Requests
app.post('/api/users', (req, res) => {
    const {body} = req
    const newUser = {id: users[users.length - 1].id + 1, ...body}
    users.push(newUser)
    return res.status(201).send(newUser)
})

// PUT Request - Update Entire Records
app.put('/api/users/:id', (req, res) => {
    const {body, params: {id}} = req
    const parseId = parseInt(id)

    if(isNaN(parseId)) return res.sendStatus(400)
    const findUserIndex = users.findIndex(user => user.id === parseId)
    if(findUserIndex === -1) return res.sendStatus(404)
    users[findUserIndex] = {id: parseId, ...body}
    return res.sendStatus(200)
})

// PATCH Request - Update Partial Record (Not Update Entire User)
app.patch('/api/users/:id',  (req, res) => {
    const {body, params: {id}} = req
    const parseId = parseInt(id)

    if(isNaN(parseId)) return res.sendStatus(400)
    const findUserIndex = users.findIndex(user => user.id === parseId)
    if(findUserIndex === -1) return res.sendStatus(404)
    users[findUserIndex] = {...users[findUserIndex], ...body}
    return res.sendStatus(200)
})

// DELETE Request
app.delete('/api/users/:id',  (req, res) => {
    const {params: {id}} = req
    const parseId = parseInt(id)

    if(isNaN(parseId)) return res.sendStatus(400)
    const findUserIndex = users.findIndex(user => user.id === parseId)
    if(findUserIndex === -1) return res.sendStatus(404)
    users.splice(findUserIndex,1)
    return res.sendStatus(200)
})


app.get('/api/products', (req, res) => {
    res.send([
        {id: 1, productName: "Flower Vase", category: "Home Decor"},
    ])
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
})

// localhost:3000 - Base Route
// localhost:3000/users - Base Route
// localhost:3000/products - Base Route