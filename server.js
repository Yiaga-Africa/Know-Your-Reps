const { ApolloServer, gql } = require('apollo-server-express')
const express = require('express')

const port = process.env.PORT || 5000

// Hardcoded data store
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const legislators = [
    {
        
    }
]

// Schema definition
const typeDefs = gql`
    type Book {
      title: String
      author: String
    }

    type Legislator {
        name: String
        position: String
    }
  
    type Query {
      books: [Book]
      legislators: [Legislator]
    }
  `;

// Resolver map
const resolvers = {
    Query: {
        books() {
            return books;
        },

        legislators() {
            return legislators;
        }
    },
};

async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({ typeDefs, resolvers })
    await server.start()
    const app = express()
    server.applyMiddleware({ app })
    await new Promise(resolve => app.listen({ port }, resolve))
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers)

// app.listen(port, () => console.log(`Listening on port ${port}`))

// app.get('/api/express_backend', (req, res) => {
//     res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' })
// });