import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import schema from './schemas/brewery.graphql';
import { allBreweries } from './resolvers/brewery';

const resolvers = {
  Query: {
    allBreweries,
  },
};

export const graphql = graphqlExpress({
  schema: makeExecutableSchema({ typeDefs: schema, resolvers })
});
export const graphiql = graphiqlExpress({ endpointURL: '/graphql' });
