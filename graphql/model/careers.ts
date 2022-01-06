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
    extend type Mutation {
        careerCreate(companyName: String, companyProject: String, startYear: String, startDate: String, endYear: String, endDate: String): String
        careerEdit(uid: Int!, companyName: String, companyProject: String, startYear: String, startDate: String, endYear: String, endDate: String): String
        careerDel(uid: Int!): String
    }
`;

export const careersResolver = {
    Query: {
        careers: async (_, { limit, offset }) => {
        //_로 제거 가능
        const result = await Careers.findAll({
            offset,
            limit,
            raw: true,
            order: [['createdAt', 'DESC']],
        });
        return result;
        }
    },
    Mutation: {
        careerCreate: async (_, payload) => {
            try{
                console.log(payload);
                const result = await Careers.create(payload)
                .catch(function (err) {
                    console.log(err);
                    const isSequelizeValidateError = err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError";
                    if (isSequelizeValidateError) {
                        throw 'sequelize 에러입니다.';
                    }
                });
                console.log(result);
                if (result) {
                    return "성공";
                } else {
                    throw "sequelize 에러입니다.";
                } 
            } catch (err) {
                return err;
            }
        },
        careerEdit: async (_, payload) => {
            try{
                const { uid, companyName, companyProject, startYear, startDate } = payload;
                const result = await Careers.update({ companyName, companyProject, startYear, startDate }, { where: {
                    uid
                }})
                .catch(function (err) {
                    const isSequelizeValidateError = err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError";
                    if (isSequelizeValidateError) {
                        throw 'sequelize 에러입니다.';
                    }
                });
                if (result) {
                    return "성공";
                } else {
                    throw "sequelize 에러입니다.";
                } 

            } catch (err) {
                return err;
            }
        },
        careerDel: async (_, { uid }) => {
            try {
                const result = await Careers.destroy({where: { uid }})
                .catch(function (err) {
                    const isSequelizeValidateError = err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError";
                    if (isSequelizeValidateError) {
                        throw 'sequelize 에러입니다.';
                    }
                });
                if (result) {
                    return "성공";
                } else {
                    throw "sequelize 에러입니다.";
                }               

            } catch (err) {
                return err;
            }
        }
    }
};