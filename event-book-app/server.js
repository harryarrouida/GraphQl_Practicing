const express = require("express")
const bodyParser = require("body-parser")
const {graphqlHTTP} = require("express-graphql")

const {buildSchema} = require("graphql")

const app = express()
const port = 5000

app.use(bodyParser.json())

const events = ["all-night coding", "all-day coding", "all-week coding"]

const schema = buildSchema(`
    type Query {
        events: [String!]!
    }
    type Mutation {
        createEvent(name: String): String
    }
`)

const rootValue = {
    events: () => {
        return events
    },
    createEvent: ({name}) => {
        events.push(name)
        return name
    }
}

app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true
}))

app.listen(port, () => {
    console.log("server is running")
})