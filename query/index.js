const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get("/posts", (req, res) => {
    res.send(posts)
})

app.post("/events", (req, res) => {
    const { type, data } = req.body

    switch (type) {

        case "PostCreated": {
            const { id, title, body } = data

            posts[id] = { id, title, body, comments: [] }

            break;
        }

        case "CommentCreated": {
            const { id, content, postId } = data

            const post = posts[postId]
            post.comments.push({ id, content })
            break
        }


        default: {
            res.status(404).json({
                status: "failed",
                message: "Invalid type found"
            })
        }
    }

    res.send({})
})


app.listen(4060, () => {
    console.log("listening on 4060")
})