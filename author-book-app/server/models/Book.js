const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bookModel = new Schema({
    title: {
        type: String, required: true
    }, 
    description: {
        type: String, required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Author"
    }
})

module.exports = new mongoose.model("Book", bookModel)