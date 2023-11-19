const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
const http = require("http")

const routes = require("./routes")

const app = express()
const server = http.Server(app)
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

mongoose.connect(
  "mongodb+srv://omnistack:omnistack@cluster0.t5byljq.mongodb.net/omnistack9?retryWrites=true&w=majority"
)

const connectedUsers = {}

io.on("connection", (socket) => {
  const { user_id } = socket.handshake.query

  connectedUsers[user_id] = socket.id
})

app.use((req, res, next) => {
  req.io = io
  req.connectedUsers = connectedUsers

  return next()
})

app.use(cors())
app.use(express.json())
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")))
app.use(routes)

server.listen(3333)
