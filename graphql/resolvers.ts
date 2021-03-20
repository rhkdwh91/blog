import { User } from "../sqlz/models/User";
import { Portfolio } from "../sqlz/models/Portfolio";
//import StatusCode from "./constants/statusCode";

const resolvers = {
  Query: {
    users: async (obj, args, { limit, offset}) => {
      console.log(obj, args);
      //obj=>대부분 사용되지 않는 루트 Query 타입의 이전 객체.
      //args=> GraphQL 쿼리의 필드에 제공된 인수.
      const result = await User.findAll({
        offset,
        limit
      });
      return result;
    },
    portfolios: async (_, { limit, offset}) => {
      //_로 제거 가능
      const result = await Portfolio.findAll({
        offset,
        limit
      });
      return result;
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