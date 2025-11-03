const express = require("express")
const { default: userRouter } = require("./routes/userRoutes.js")
const server = express()

const port = 3333

server.use("/users", userRouter)


server.listen(port, ()=>{
    console.log("Running server on 3333...")
})