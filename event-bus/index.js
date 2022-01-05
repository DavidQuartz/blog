const express = require("express")
const axios = require("axios")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json())

app.post("/events", (req, res) => {

    const event = req.body

    axios.post('http://posts-clusterip-srv:4000/events', event)
    axios.post('http://comments-srv:4040/events', event)
    axios.post('http://query-srv:4002/events', event)
    axios.post('http://moderation-srv:4003/events', event)

    res.send({status: "OK"})
})

app.listen(4050, () => {
    console.log("listening on port 4050")
})