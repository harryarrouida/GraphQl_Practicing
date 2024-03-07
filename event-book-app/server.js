const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");

const { buildSchema } = require("graphql");

const app = express();
const port = 5000;

app.use(bodyParser.json());

const events = [];

const schema = buildSchema(`
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input EventInput {
         title: String!
         description: String!
         price: Float!
         date: String!
    }

    type Query {
        events: [String!]!
    }
    type Mutation {
        createEvent(eventInput: EventInput!): String
    }
`);

const rootValue = {
  events: () => {
    return events;
  },
  createEvent: (args) => {
    const event = {
        _id: Math.random().toString(),
        title: args.title,
        description: args.description,
        price: +args.price,
        date: new Date().toISOString()
    }
    events.push(event)
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log("server is running");
});
