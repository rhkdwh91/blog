const statusUtil = {
  success: (data, result) => {
    return { data: data, result: result, code: 200 };
  },
  false: (data, result, code) => {
    return { data: data, result: result, code: code };
  },
};

export default statusUtil;
