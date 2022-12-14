const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");

const { buildSchema } = require("graphql");
const app = express();
const mongoose = require("mongoose");

const graphqlschema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');

app.use(bodyParser.json());


app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlschema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.9ehtu7c.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err);
  });
