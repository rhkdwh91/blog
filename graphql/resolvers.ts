import user from "./db/models/user";
import portfolio from "./db/models/portfolio";
//import StatusCode from "./constants/statusCode";

const resolvers = {
  Query: {
    users: async (obj, args, { limit, offset}) => {
      console.log(obj, args);
      //obj=>대부분 사용되지 않는 루트 Query 타입의 이전 객체.
      //args=> GraphQL 쿼리의 필드에 제공된 인수.
      const result = await user.selectAll( limit, offset );
      return result.data;
    },
    portfolios: async (_, { limit, offset}) => {
      //_로 제거 가능
      const result = await portfolio.selectAll(limit, offset);
      return result.data;
    }
  },
  /*
  Mutation: {
    addUser: async (_, { userId, userName }) => {
      const result = await user.insert(userId, userName);
      return result.code === StatusCode.OK ? true : false;
    },
  },*/
};

export default resolvers;