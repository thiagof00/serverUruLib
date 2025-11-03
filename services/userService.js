import { response } from "express"
import usePrisma from "../prisma/client.js"



export const userService = {

    async getAllUser(){
        const response = await usePrisma.usuario.findMany()
     return response
    },

    async getUserById(id){
        const response = await usePrisma.usuario.findUnique({where: {id: Number(id)}})
        return response
    },
    async createUser (data){
        const response = await usePrisma.usuario.create({data})
        return response
    },
    async deleteUser (id){
        const response = await usePrisma.usuario.delete({where:{id: Number(id)}})
        return response
    },
    async updateUser (id, data){
        const response = await usePrisma.usuario.update({
            where: {id: Number(id)},
            data
        })
    }
    
    


}