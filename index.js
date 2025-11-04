const express = require("express")
const { default: userRouter } = require("./routes/userRoutes.js")
const server = express()

server.use(express.json());
server.use("/users", userRouter)


server.listen(process.env.PORT, ()=>{
    console.log("Running server on 3333...")
})