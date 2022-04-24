import { Posts } from "../../sqlz/models/Posts";
import { gql } from "apollo-server-express";
import { isAuthenticated } from "../utils/jwt";

export const postsSchema = gql`
  type Post {
    uid: Int!
    title: String
    content: String
    userId: String
    userName: String
    createdAt: String
    updatedAt: String
  }
  extend type Query {
    posts(limit: Int, offset: Int): [Post]!
    post(uid: Int): Post!
  }
  extend type Mutation {
    postCreate(title: String, content: String): String
    postEdit(uid: Int!, title: String, content: String): String
    postDel(uid: Int!): String
  }
`;

export const postsResolver = {
  Query: {
    posts: async (_, { limit, offset }) => {
      //_로 제거 가능
      const result = await Posts.findAll({
        offset,
        limit,
        raw: true,
        order: [["createdAt", "DESC"]],
      });
      return result;
    },
    post: async (_, { uid }) => {
      const result = await Posts.findOne({
        where: {
          uid,
        },
      });
      return result;
    },
  },
  Mutation: {
    postCreate: async (_, payload, context) => {
      try {
        const isUser = await isAuthenticated(context);
        if (isUser.code === 200) {
          const result = await Posts.create({
            ...payload,
            userName: isUser.data.user_name,
            userId: isUser.data.user_id,
          }).catch(function (err) {
            console.log(err);
            const isSequelizeValidateError =
              err.name === "SequelizeValidationError" ||
              err.name === "SequelizeUniqueConstraintError";
            if (isSequelizeValidateError) {
              throw "sequelize 에러입니다.";
            }
          });
          if (result) {
            return "성공";
          } else {
            throw "sequelize 에러입니다.";
          }
        }
        throw isUser.result;
      } catch (err) {
        console.error(err);
        return err;
      }
    },
    postEdit: async (_, payload, context) => {
      try {
        const isUser = await isAuthenticated(context);
        if (isUser.code === 200) {
          const result = await Posts.update(payload, {
            where: {
              uid: payload.uid,
              userId: isUser.data.user_id,
            },
          }).catch(function (err) {
            const isSequelizeValidateError =
              err.name === "SequelizeValidationError" ||
              err.name === "SequelizeUniqueConstraintError";
            console.error(err);
            if (isSequelizeValidateError) {
              throw "sequelize 에러입니다.";
            }
          });
          if (result) {
            return "성공";
          } else {
            throw "sequelize 에러입니다.";
          }
        }
        throw isUser.result;
      } catch (err) {
        console.error(err);
        return err;
      }
    },
    postDel: async (_, { uid }, context) => {
      try {
        const isUser = await isAuthenticated(context);
        if (isUser.code === 200) {
          const result = await Posts.destroy({
            where: { uid, userId: isUser.data.user_id },
          }).catch(function (err) {
            const isSequelizeValidateError =
              err.name === "SequelizeValidationError" ||
              err.name === "SequelizeUniqueConstraintError";
            if (isSequelizeValidateError) {
              throw "sequelize 에러입니다.";
            }
          });
          console.log(result);
          if (result) {
            return "성공";
          } else {
            throw "해당 포스트를 찾을 수 없습니다.";
          }
        }
        throw isUser.result;
      } catch (err) {
        console.error(err);
        return err;
      }
    },
  },
};
