import { gql, makeExecutableSchema } from 'apollo-server-express';
import { userSchema, userResolver } from './model/user';
import { portfolioSchema, portfolioResolver } from './model/portfolio';

const RootSchema = gql`
  type Query {
    root: String
  }
  type Mutation{
    root: String
  }
`;

const RootResolver = {
  Query: {
    root: () => 'Root resolver is running!',
  },
};

export const schema = makeExecutableSchema({
  typeDefs: [RootSchema, userSchema, portfolioSchema],
  resolvers: [RootResolver, userResolver, portfolioResolver],
});