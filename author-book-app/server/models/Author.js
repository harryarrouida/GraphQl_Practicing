const mongoose = require("mongoose")
const Schema = mongoose.Schema

const authorModel = new Schema({
    name: {
        type: String, required: true
    },
    books: [{
        type: mongoose.Types.ObjectId,
        ref: "Book"
    }]
})

module.exports = new mongoose.model("Author", authorModel)