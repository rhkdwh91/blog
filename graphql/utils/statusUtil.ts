const statusUtil = {
  success: ( data, result ) => {
    return { code: 200, data: data, result: result };
  },
  false: ( code, data, result) => {
    return { code: code, data: data, result: result };
  },
};

export default statusUtil;