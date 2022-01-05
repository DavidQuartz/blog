const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser')
const {randomBytes} = require("crypto")
const axios = require("axios")

const app = express()

app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.post("/posts/create", async (req, res) => {
    const { title, body } = req.body


    const id = randomBytes(4).toString("hex")
    
    posts[id] = { id, title, body }
    
    await axios.post("http://event-bus-srv:4050/events", {
        type: "PostCreated",
        data: {
            id,
            title,
            body
        }
    })

    res.status(201).send(posts[id])
});

app.post("/events", (req, res) => {
    console.log("Received event", req.body.type)

    res.send({})
});


app.listen(4000, () => {
    console.log('v10')
    console.log("listening on port 4000")
})