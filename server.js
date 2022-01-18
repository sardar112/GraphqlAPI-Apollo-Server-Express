const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const { connection } = require('./utils/util');
const { verifyUser } = require('./helper/context');

dotEnv.config({ path: '.env' });

const app = express();

app.use(cors());
//db connection
connection();
//For body parser
app.use(express.json());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  contex: async ({ req }) => {
    await verifyUser(req);
    return {
      userId: req.id,
    };
  },
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 3000;

app.use('/', (req, res, next) => {
  res.status(200).json({
    status: 'OK',
    message: 'Welcome Oh la la oh la la.',
  });
});
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
  console.log(`Graphql endpoint on port: ${apolloServer.graphqlPath}`);
});
