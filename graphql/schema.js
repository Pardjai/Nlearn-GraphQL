const {buildSchema} = require('graphql')

module.exports = buildSchema(`
    type User {
        name: String!
        age: Int!
        email: String!
    }

    type TestType {
        count: Int!
        users: [User!]!
    }

    type Todo {
        title: String!
        id: ID!
        done: Boolean!
        createdAt: String
        updatedAt: String
    }

    input UserInput {
        name: String!
        email: String!
    }

    input TodoInput {
        title: String!
    }
    
    type Query {
        test: TestType!
        random(min: Int!, max: Int!, count: Int!): [Float!]!
        getTodos: [Todo!]!
    }

    type Mutation {
        addTestUser( user: UserInput! ): User!
        addTodo(todo: TodoInput!): Todo!
        completeTodo(id: ID!): Todo!
        removeTodo(id: ID!): Boolean!
    }

`)