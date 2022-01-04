const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const { randomBytes } = require("crypto")
const axios = require("axios")

const app = express()


app.use(bodyParser.json())
app.use(cors())

const comments = {}

app.get("/posts/:id/comments", (req, res) => {

    const commentsArray = comments[req.params.id] || []

    res.send(commentsArray)
});

app.post("/posts/:id/comments", async (req, res) => {
    const { content } = req.body

    const postId = req.params.id

    const commentId = randomBytes(4).toString("hex")

    const newComment = {id: commentId, content}
 
    if (postId in comments) {
        comments[postId] = [newComment, ...comments[postId]]
    } else {
         comments[postId] = [newComment]
    }

        await axios.post("http://localhost:4050/events", {
            type: "CommentCreated",
            data: {
                id: commentId,
                content,
                postId
            }
        });
    
    res.status(201).send(comments[postId])
})

app.post("/events", (req, res) => {
console.log("Received event", req.body.type)

res.send({})

})

app.listen(4040, () => {
    console.log("Listening on port 4040")
})