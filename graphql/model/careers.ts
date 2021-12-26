import { Careers } from "../../sqlz/models/Careers";
import { gql } from 'apollo-server-express';

export const careersSchema = gql`
    type Career {
        uid: Int!
        companyName: String
        companyProject: String
        startYear: String
        startDate: String
        endYear: String
        endDate: String
        createdAt: String
        updatedAt: String
    }
    extend type Query {
        careers(limit: Int, offset: Int): [Career]!
    }
`;

export const careersResolver = {
    Query: {
        careers: async (_, { limit, offset}) => {
        //_로 제거 가능
        const result = await Careers.findAll({
            offset,
            limit
        });
        return result;
        }
    }
};