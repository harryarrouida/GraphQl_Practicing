const express = require("express")
const mongoose = require("mongoose")
const {ApolloServer} = require("apollo-server-express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
const port = 4000

app.use(bodyParser.json())
app.use(cors())

const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")

const server = new ApolloServer({typeDefs, resolvers})

mongoose.connect("mongodb+srv://hamzaarr84:graphql@cluster0.ct6h1y3.mongodb.net/author-book-app")
.then(async () => {
    await server.start()
    app.listen(port, () => console.log("server is running"))
})
.catch(err => console.log('connection failed: ', err))