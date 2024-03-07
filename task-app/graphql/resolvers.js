const Task = require("../models/task")

const resolvers = {
    tasks: async () => {
        try {
            const tasks = await Task.find()
            return tasks.map((task) => {
                return {...task._doc, _id: task.id.toString()}
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    addTask: async (args) => {
        const task = new Task({
            title: args.title,
            description: args.description,
            completed: args.completed,
            createdAt: args.createdAt
        }) 
        try {
            const result = await task.save()
            return {
                _id: result._id.toString(),
                title: result.title,
                description: result.description,
                completed: result.completed,
                createdAt: result.createdAt
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

module.exports = resolvers