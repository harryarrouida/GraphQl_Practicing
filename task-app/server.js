const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema, graphql } = require("graphql");

const bodyParser = require("body-parser");

const app = express();
const port = 4000;

app.use(bodyParser.json());

const resolvers = require("./graphql/resolvers")
const schema = buildSchema(require("fs").readFileSync("./graphql/schema.gql", "utf-8"))

app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}))

mongoose
  .connect(
    "mongodb+srv://hamzaarr84:graphql@cluster0.ct6h1y3.mongodb.net/tasks-app?retryWrites=true"
  )
  .then(() =>
    app.listen(port, () => {
      console.log("server is running");
    })
  )
  .catch((err) => console.log("mongodb connection failed"));
