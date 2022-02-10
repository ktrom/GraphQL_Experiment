const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    giveRandInt(maxNum: Int!): Int
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  giveRandInt: (args) => {
      return Math.floor(Math.random() * args.maxNum);
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');