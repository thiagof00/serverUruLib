import usePrisma from "../prisma/client.js"



export const booksService = {

    async getAllBooks(){
        const response = await usePrisma.livro.findMany()
     return response
    },

    async getBookById(id){
        const response = await usePrisma.livro.findUnique({where: {id: Number(id)}})
        return response
    },
    async createBook (data){
        const response = await usePrisma.livro.create({data})
        return response
    },
    async deleteBook (id){
        const response = await usePrisma.livro.delete({where:{id: Number(id)}})
        return response
    },
    async updateBook (id, data){
        const response = await usePrisma.livro.update({
            where: {id: Number(id)},
            data
        })
        return response
    }
    
    


}