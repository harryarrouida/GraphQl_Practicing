const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const { buildSchema } = require("graphql");

const app = express();
const port = 5000;

app.use(bodyParser.json());

const events = [];
const Event = require("./models/event");

const schema = buildSchema(`
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    type Query {
        events: [Event!]!
    }

    type Mutation {
        createEvent(title: String!
            description: String!
            price: Float!
            date: String!): Event
    }
`);

const rootValue = {
  events: () => {
    return events;
  },
  createEvent: (args) => {
    const event = new Event({
      title: args.title,
      description: args.description,
      price: +args.price,
      date: new Date(args.date),
    });
  
    return event
      .save()
      .then((result) => {
        console.log(result);
        return {
          _id: result._id,
          title: result.title,
          description: result.description,
          price: result.price,
          date: result.date.toISOString(), // Adjust the date formatting if needed
        };
      })
      .catch((err) => {
        console.error(err);
        throw err; // Make sure to throw the error to indicate a failed mutation
      });
  },
  
}

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://hamzaarr84:graphql@cluster0.ct6h1y3.mongodb.net/event-book-app?retryWrites=true`
  )
  .then(() => app.listen(port, () => console.log("server is running")))
  .catch((err) => console.log(err));
