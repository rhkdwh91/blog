import { User } from "../../sqlz/models/User";
import { gql } from 'apollo-server-express';
//import StatusCode from "./constants/statusCode";

export const userSchema = gql`
    type User {
        uid: Int!
        user_id: String
        user_name: String
        createdAt: String
        updatedAt: String
    }
    extend type Query {
        user(name:String): User
        users(limit: Int, offset: Int): [User]!
    }
    extend type Mutation {
        addUser(userId: String!, userName: String!): Boolean
    }
`;

export const userResolver = {
  Query: {
    users: async (obj, args, { limit, offset }) => {
      console.log(obj, args);
      //obj=>대부분 사용되지 않는 루트 Query 타입의 이전 객체.
      //args=> GraphQL 쿼리의 필드에 제공된 인수.
      const result = await User.findAll({
        offset,
        limit
      });
      return result;
    }
  },
  Mutation: {
    addUser: async (_, { userId, userName }) => {
      return;
    },
  }
};