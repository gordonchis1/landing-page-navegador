
const mongoose = require("mongoose")
const {Schema, model} = mongoose

const noteSchema = new Schema({title: String, description:String, addTime: String, limitTime: String, tags: Array})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject.__v
        delete returnedObject._id
    }
}) 

const Note = model('Note', noteSchema)

module.exports = Note


