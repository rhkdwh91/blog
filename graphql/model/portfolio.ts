import { Portfolio } from "../../sqlz/models/Portfolio";
import { gql } from "apollo-server-express";

export const portfolioSchema = gql`
  type Portfolio {
    uid: Int!
    content: String
    image: String
    createdAt: String
    updatedAt: String
  }
  extend type Query {
    portfolios(limit: Int, offset: Int): [Portfolio]!
  }
`;

export const portfolioResolver = {
  Query: {
    portfolios: async (_, { limit, offset }) => {
      //_로 제거 가능
      const result = await Portfolio.findAll({
        offset,
        limit,
      });
      return result;
    },
  },
};
