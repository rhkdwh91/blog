import { Board } from "../../sqlz/models/Board";
import { gql } from "apollo-server-express";

export const boardSchema = gql`
  type Board {
    uid: Int!
    title: String
    content: String
    userName: String
    createdAt: String
    updatedAt: String
  }
  extend type Query {
    boardList(limit: Int, offset: Int): [Board]!
    board(uid: Int): Board!
  }
  extend type Mutation {
    boardCreate(title: String, content: String, userName: String): String
    boardEdit(
      uid: Int!
      title: String
      content: String
      userName: String
    ): String
    boardDel(uid: Int!): String
  }
`;

export const boardResolver = {
  Query: {
    boardList: async (_, { limit, offset }) => {
      //_로 제거 가능
      const result = await Board.findAll({
        offset,
        limit,
        raw: true,
        order: [["createdAt", "DESC"]],
      });
      return result;
    },
    board: async (_, { uid }) => {
      const result = await Board.findOne({
        where: {
          uid,
        },
      });
      return result;
    },
  },
  Mutation: {
    boardCreate: async (_, payload) => {
      try {
        const result = await Board.create(payload).catch(function (err) {
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
    boardEdit: async (_, payload) => {
      try {
        const result = await Board.update(payload, {
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
    boardDel: async (_, { uid }) => {
      try {
        const result = await Board.destroy({ where: { uid } }).catch(function (
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
