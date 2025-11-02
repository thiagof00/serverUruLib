const express = require("express")
const { userService } = require("./services/userService.js")
const server = express()

const port = 3333

server.get("/users", async (req, res)=>{
    const users = await userService.getAllUser()
    res.json(users)
})


server.listen(port, ()=>{
    console.log("Running server on 3333...")
})