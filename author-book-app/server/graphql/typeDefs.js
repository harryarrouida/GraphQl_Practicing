const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    authors: [Author!]!
    books: [Book!]!
  }
  type Author {
    _id: ID!
  }
  type Book {
    _id: ID!
  }
  type Mutation {
    AddBook(input: bookInput!): Book
    AddAuthor(input: authorInput!): Author
  }
  input authorInput {
    _id: ID!
  }
  input bookInput {
    _id: ID!
  }
`;

module.exports = typeDefs;
