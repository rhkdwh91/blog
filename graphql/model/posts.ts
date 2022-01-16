import { Posts } from "../../sqlz/models/Posts";
import { gql } from "apollo-server-express";

export const postsSchema = gql`
  type Post {
    uid: Int!
    title: String
    content: String
    userName: String
    createdAt: String
    updatedAt: String
  }
  extend type Query {
    posts(limit: Int, offset: Int): [Post]!
    post(uid: Int): Post!
  }
  extend type Mutation {
    postCreate(title: String, content: String, userName: String): String
    postEdit(
      uid: Int!
      title: String
      content: String
      userName: String
    ): String
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
    postCreate: async (_, payload) => {
      try {
        const result = await Posts.create(payload).catch(function (err) {
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
      } catch (err) {
        console.error(err);
        return err;
      }
    },
    postEdit: async (_, payload) => {
      try {
        const result = await Posts.update(payload, {
          where: {
            uid: payload.uid,
          },
        }).catch(function (err) {
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
      } catch (err) {
        console.error(err);
        return err;
      }
    },
    postDel: async (_, { uid }) => {
      try {
        const result = await Posts.destroy({ where: { uid } }).catch(function (
          err
        ) {
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
      } catch (err) {
        console.error(err);
        return err;
      }
    },
  },
};
