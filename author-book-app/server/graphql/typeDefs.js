const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    authors: [Author!]
    books: [Book!]
  }
  type Author {
    _id: ID!
    name: String!
    books: [Book]
  }
  type Book {
    _id: ID!
    title: String!
    description: String!
    author: Author!
  }
  type Mutation {
    createBook(input: BookInput): Book
    createAuthor(input: AuthorInput): Author
  }
  input AuthorInput {
    name: String!
  }
  input BookInput {
    title: String!
    description: String!
    author: ID!
  }
`;

module.exports = typeDefs;
