import { gql, makeExecutableSchema } from "apollo-server-express";
import { userSchema, userResolver } from "./model/user";
import { portfolioSchema, portfolioResolver } from "./model/portfolio";
import { careersSchema, careersResolver } from "./model/careers";
import { postsSchema, postsResolver } from "./model/posts";

const RootSchema = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

const RootResolver = {
  Query: {
    root: () => "Root resolver is running!",
  },
};

export const schema = makeExecutableSchema({
  typeDefs: [
    RootSchema,
    userSchema,
    portfolioSchema,
    careersSchema,
    postsSchema,
  ],
  resolvers: [
    RootResolver,
    userResolver,
    portfolioResolver,
    careersResolver,
    postsResolver,
  ],
});
