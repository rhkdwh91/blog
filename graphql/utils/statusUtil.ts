import StatusCode from "../constants/statusCode";

const statusUtil = {
  success: (data) => {
    return { code: StatusCode.OK, data: data };
  },
  false: () => {
    return { code: StatusCode.ERORR };
  },
};

export default statusUtil;