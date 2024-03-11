const Author = require("../models/Author");
const Book = require("../models/Book");

const resolvers = {
  Query: {
    books: async () => {
      try {
        const books = await Book.find();
        return books.map((book) => ({
          ...book._doc,
          _id: book._id.toString(),
        }));
      } catch (error) {
        console.log("error fetching books: ", error);
      }
    },
    authors: async () => {
      try {
        const authors = await Author.find();
        return authors.map((author) => ({
          ...author._doc,
          _id: author._id.toString(),
        }));
      } catch (error) {
        console.log("error fetching authors: ", error);
      }
    },
  },
  Mutation: {
    createAuthor: async (parent, args) => {
      const newAuthor = new Author({
        name: args.authorInput.name,
      });
      try {
        const result = await newAuthor.save();
        return {
          ...result._doc,
          _id: result._id.toString(),
        };
      } catch (error) {
        console.log("error saving author: ", error);
      }
    },
    createBook: async (parent, args) => {
      const newBook = new Book({
        title: args.bookInput.title,
        description: args.bookInput.description,
        author: args.bookInput.authorId,
      });

      try {
        const result = await newBook.save();
        // Update author's books field
        const author = await Author.findById(args.bookInput.authorId);
        author.books.push(newBook);
        await author.save();

        return {
          ...result._doc,
          id: result._id.toString(),
        };
      } catch (error) {
        console.log("error saving book: ", error);
      }
    },
  },
  Book: {
    author: async (parent) => {
      try {
        const author = await Author.findById(parent.author);
        return {
          ...author._doc,
          _id: author._id.toString(),
        };
      } catch (error) {
        console.log("error fetching book author: ", error);
      }
    },
  },
};

module.exports = resolvers;
