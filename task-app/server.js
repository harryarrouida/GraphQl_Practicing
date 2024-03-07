const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const bodyParser = require("body-parser");

const app = express();
const port = 4000;

app.use(bodyParser.json());

const Task = require("./models/task");



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
