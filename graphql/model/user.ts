import { User } from "../../sqlz/models/User";
import { gql } from 'apollo-server-express';
import statusUtil from "../utils/statusUtil";
import { userCheck, isAuthenticated } from "../utils/jwt";
//import StatusCode from "./constants/statusCode";

export const userSchema = gql`
    type User {
      uid: Int!
      user_id: String
      user_name: String
      createdAt: String
      updatedAt: String
    }
    type QueryMessage {
      data: [User],
      result: String,
      code: Int
    }
    type MutationMessage {
      data: String,
      result: String,
      code: Int
    }
    extend type Query {
      user(user_id:String!): QueryMessage
      users(limit: Int, offset: Int): QueryMessage
    }
    extend type Mutation {
      login (user_id: String!, password: String!): MutationMessage
      logout: MutationMessage
      signUp (user_id: String!, userName: String!, password: String!): MutationMessage
    }
`;

export const userResolver = {
  Query: {
    user: async (_, { user_id }, context) => {
      try {
        const isUser = await isAuthenticated(context);
        if (isUser.code === 200) {
          if (user_id !== undefined) {
            const user = await User.findOne({
              where: { user_id },
            });
            if(user !== null) {
              const results = statusUtil.success([user], '유저 검색 성공했습니다.');
              return results;
            } else {
              throw "해당 유저가 존재하지 않습니다.";
            }
          } else {
            throw "유저ID를 입력해 주세요.";
          }
        } else {
          throw isUser.result;
        }
      } catch (e) {
        const results = statusUtil.false([], String(e), 400);
        return results;
      }   
    },
    users: async (obj, args, { limit, offset }) => {
      //obj=>대부분 사용되지 않는 루트 Query 타입의 이전 객체.
      //args=> GraphQL 쿼리의 필드에 제공된 인수.
      try {
        const users = await User.findAll({
          offset,
          limit
        });
        if (users === null) {
          throw '유저가 없습니다.'
        }
        const result = statusUtil.success(users, '유저 검색 성공했습니다.');
        return result;
      } catch (e) {
        const results = statusUtil.false([], String(e), 400);
        return results;
      }
    }
  },
  Mutation: {
    login: async (_, { user_id, password }, context) => {
      try {
        if (user_id === '' || user_id === null || user_id === undefined || user_id === ' ') {
          throw '아이디를 입력해주세요';
        }
        else if (password === '' || password === null || password === undefined || password === ' ') {
          throw '비밀번호를 입력해주세요'
        }
        const results = await userCheck(user_id, password);      
        if(results.code === 200) {
          const expiryDate = new Date(Date.now() + 60000 * 60 * 24 * 14 - 60000); // (2 weeks - 1 min)
          context.res.cookie('authtoken', results.data, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: expiryDate,
          });
        }
        return results;
      }
      catch (e) {
        const results = statusUtil.false('', String(e), 400);
        return results;
      }
    },
    logout: async (_, {}, context) => {
      console.log('RESOLVER!!!!!!!!!!!!!!', context.res);
      context.res.clearCookie("authtoken");
      const results = statusUtil.success('', '로그아웃성공했습니다.');
      return results;
    },
    signUp: async (_, { user_id, userName, password }) => {
      return;
    },
  }
};