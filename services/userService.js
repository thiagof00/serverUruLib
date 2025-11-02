import { response } from "express"
import usePrisma from "../prisma/client.js"



export const userService = {

    async getAllUser(){
        const response = await usePrisma.user.findMany()
     return response
    },

    async getUserById(id){
        const response = await usePrisma.user.findUnique({where: {id: Number(id)}})
    },
    async cerateUser (data){
        const response = await usePrisma.user.create({data})
        return response
    }


}