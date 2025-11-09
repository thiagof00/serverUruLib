import express from 'express'
import { booksService } from '../services/booksService.js'

const bookRouter = express.Router()

bookRouter.get('/', async (req, res)=>{
    try{
        const books = await booksService.getAllBooks()
        res.status(200).json(books)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})
bookRouter.get('/:id', async (req,res)=>{
    try{
        const book = await booksService.getBookById(req.params.id)
        if(!book){
            return res.status(404).json({error: "livro não encontrado não encontrado"})
        }
        res.json(book)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})
bookRouter.post('/', async (req,res)=>{
    try{
    const book = await booksService.createBook(req.body)

    if(!book){
        return res.status(500).json({error: "Erro ao criar o livro."})
    }
    res.status(201).json(book)
    }catch(err){
        res.status(500).json({error: err.message, err: req.body})
    }
})
bookRouter.delete('/:id', async (req,res)=>{
    try{
        const id = req.params.id
        const book = booksService.deleteBook(id) 
        return res.status(201).json({message: "livro excluído."})
    }catch(err){
        if(err.code === "P2003"){
            return res.status(400).json({
                error: "Não é possível deletar o livro, ele está vinculado a um empréstimo"
            })
        }
        console.log("Erro ao deletar o livro: ",error)
        res.status(500).json({error: err.message})
    }
})
bookRouter.put('/:id', async (req, res)=>{
    try{
        const id = req.params.id
        const livro = booksService.updateBook(id, req.body)

        if(!livro){
            return res.status(500).json({error: "Erro ao editar o livro."})
        }
        return res.status(201).json(livro)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})


export default bookRouter