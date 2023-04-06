require("./MongoDB/conect_mongo")
require('dotenv').config()


const express = require("express")
const { findById } = require("./MongoDB/models/Note.js")
const app = express()
const Note = require("./MongoDB/models/Note.js")
const cors = require('cors')

app.use(express.json())

app.use((request, response, next) => {
    console.log(request.method)
    console.log(request.path)
    console.log(request.body)
    console.log("==========================")
    next()
})
app.use(cors())

//&COLECCIONAR TODOS LOS ELEMENTOS
app.get("/api/notes",(request, response) => {
    Note.find({}).then(data => response.json(data)).catch((error) => next(error))
})

//&COLECCIONAR ELEMENTOS POR ID
app.get("/api/notes/:id",(request, response, next) => {
    const id = request.params.id
    Note.findById(id)
    .then(data => {
        if(data){response.json(data)}
    })
    .catch((error) => {next(error)})
})

//&CREAR UNA NOTA
app.post("/api/notes", (request, response, next) => {
    const body = request.body

    if (!body || !body.title || !body.limitTime) {
        return response.status(400).json({ error: 'no content' })
      }

    const newNote = new Note({
        title: body.title,
        description: body.description || "",
        addTime: new Date().toLocaleString(),
        limitTime: new Date(body.limitTime).toLocaleString(),
        tags: body.tags
    })

    newNote.save()
    .then(note => {response.json(newNote)}).catch(error => next(error))

})

//&BORRAR UNA NOTA POR ID
app.delete("/api/notes/:id", (request, response, next) => {
    const id = request.params.id

    Note.findByIdAndRemove(id)
    .then(result => {response.status(204).end()})
    .catch(err => next(err))
    
})

//&MODIFICAR UNA NOTA POR ID
app.put("/api/notes/:id", (request, response, next) => {
    const id = request.params.id
    const body = request.body

    const updateNote = {
        title: body.title,
        description: body.description,
        limitTime: new Date(body.limitTime).toLocaleDateString(),
        tags: body.tags 
    }

    Note.findByIdAndUpdate(id, updateNote, {new: true})
    .then(data => {
        Note.find({}).then(data => response.json(data)).catch((error) => next(error))
    })
    .catch(error => next(error))
})

//!manejo de errores 

//&error 400: bad request, error 500: server error
app.use((error, request, response, next)=> {
    if(error.name === "CastError"){
        response.status(400).end()
    }
    response.status(500).end()
})

app.use((request, response, next) => {response.status(404).end()})

const PORT = process.env.PORT 
app.listen(PORT, () => {console.log(`en escucha en puerto ${PORT}`)})