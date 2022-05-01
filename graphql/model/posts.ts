import { Posts } from "../../sqlz/models/Posts";
import { gql } from "apollo-server-express";
import { isAuthenticated } from "../utils/jwt";
import { GraphQLUpload } from "graphql-upload";
import { uploadS3 } from "../utils/s3-uploader";

export const postsSchema = gql`
  # The implementation for this scalar is provided by the
  # 'GraphQLUpload' export from the 'graphql-upload' package
  # in the resolver map below.
  scalar Upload

  type Post {
    uid: Int!
    title: String
    content: String
    userId: String
    userName: String
    createdAt: String
    updatedAt: String
  }
  type FileUrl {
    url: [String]!
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  extend type Query {
    posts(limit: Int, offset: Int): [Post]!
    post(uid: Int): Post!
  }
  extend type Mutation {
    postCreate(title: String, content: String): String
    postEdit(uid: Int!, title: String, content: String): String
    postDel(uid: Int!): String
    fileUpload(file: [Upload]!): FileUrl!
  }
`;

const fileRenamer = (filename: string): string => {
  const queHoraEs = Date.now();
  const regex = /[\s_-]/gi;
  const fileTemp = filename.replace(regex, ".");
  let arrTemp = [fileTemp.split(".")];
  return `${arrTemp[0]
    .slice(0, arrTemp[0].length - 1)
    .join("_")}${queHoraEs}.${arrTemp[0].pop()}`;
};

export const postsResolver = {
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: GraphQLUpload,
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
    fileUpload: async (_, { file }) => {
      let url: any = [];
      for (let i = 0; i < file.length; i++) {
        const { createReadStream, filename, mimetype } = await file[i];
        const stream = createReadStream();
        const assetUniqName = fileRenamer(filename);
        const result = await uploadS3(stream, "blog", assetUniqName, mimetype);
        url.push(result?.Location);
      }
      return { url: url };
    },
  },
};
