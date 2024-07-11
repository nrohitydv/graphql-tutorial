const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    username: String!
    website: String!
    phone: String!
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean
    user: User
  }

  type Query {
    getTodos: [Todo]
    getUser(id: ID!): User
    getAllUsers: [User]
  }
`;

const resolvers = {
  Todo: {
    user: async (todo) =>
      (
        await axios.get(
          `https://jsonplaceholder.typicode.com/users/${todo.userId}`
        )
      ).data,
  },
  Query: {
    getTodos: async () =>
      (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
    getAllUsers: async () =>
      (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
    getUser: async (parent, { id }) =>
      (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))
        .data,
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  app.use(bodyParser.json());
  app.use(cors());
  app.use("/graphql", expressMiddleware(server));

  app.listen({ port: 8000 }, () => {
    console.log("Server is running on port 8000");
  });
}

startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
