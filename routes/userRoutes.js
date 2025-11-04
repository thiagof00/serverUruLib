import express from 'express'
import { userService } from '../services/userService.js'

const userRouter = express.Router()

userRouter.get('/', async (req, res)=>{
    try{
        const users = await userService.getAllUser()
        res.status(200).json(users)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})
userRouter.get('/:id', async (req,res)=>{
    try{
        const user = await userService.getUserById(req.params.id)
        if(!user){
            return res.status(404).json({error: "Usuário não encontrado"})
        }
        res.json(user)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})
userRouter.post('/', async (req,res)=>{
    try{
    const user = await userService.createUser(req.body)

    if(!user){
        return res.status(500).json({error: "Erro ao criar o usuário."})
    }
    res.status(201).json(user)
    }catch(err){
        res.status(500).json({error: err.message, err: req.body})
    }
})
userRouter.delete('/:id', async (req,res)=>{
    try{
        const id = req.params.id
        const user = userService.deleteUser(id) 
        if(!user){
        return res.status(500).json({error: "Erro deletar o usuário."})
        }
        return res.status(201).json({message: "usuario excluído."})
    }catch(err){
        res.status(500).json({error: err.message})
    }
})
userRouter.put('/:id', async (req, res)=>{
    try{
        const id = req.params.id
        const user = userService.updateUser(id, req.body)

        if(!user){
            return res.status(500).json({error: "Erro ao deletar o usuário."})
        }
        return res.status(201).json(user)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})


export default userRouter