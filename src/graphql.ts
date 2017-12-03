import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import { makeExecutableSchema } from 'graphql-tools';
import schema from './schemas/brewery.graphql';
import { allBreweries } from './resolvers/brewery';

const resolvers = {
  Query: {
    allBreweries,
  },
};

export const graphql = graphqlKoa({ schema: makeExecutableSchema({ typeDefs: schema, resolvers }) });
export const graphiql = graphiqlKoa({ endpointURL: '/graphql' });
