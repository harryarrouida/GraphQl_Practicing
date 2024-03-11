const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookModel = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
  },
});

module.exports = mongoose.model("Book", bookModel);
