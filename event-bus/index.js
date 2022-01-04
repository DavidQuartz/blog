const express = require("express")
const axios = require("axios")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json())

app.post("/events", (req, res) => {

    const event = req.body

    axios.post('http://localhost:4000/events', event)
    axios.post('http://localhost:4040/events', event)
    axios.post('http://localhost:4060/events', event)

    res.send({status: "OK"})
})

app.listen(4050, () => {
    console.log("listening on port 4050")
})