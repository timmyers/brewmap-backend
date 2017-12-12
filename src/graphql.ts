import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import schema from './schemas/brewery.graphql';
import { allBreweries, setVisited, getVisited } from './resolvers/brewery';

const resolvers = {
  Query: {
    allBreweries,
  },
  Mutation: {
    setVisited,
  },
  Brewery: {
    visited: getVisited,
  }
};

const exeSchema = makeExecutableSchema({ typeDefs: schema, resolvers });

export const graphql = graphqlExpress(req => ({
  schema: exeSchema,
  context: { user: req.user },
}));

export const graphiql = graphiqlExpress({ endpointURL: '/graphql' });
