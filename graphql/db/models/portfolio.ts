import statusUtil from "../../utils/statusUtil";
const { Portfolio } = require('../../../sqlz/models/index');

const portfolio = {
  selectAll: async ( limit, offset ) => {
    const result = await Portfolio.findAll({
        offset,
        limit
    });
    return result ? statusUtil.success(result) : statusUtil.false();
  },
  /*
  insert: async (userId, userName) => {
    const query = `INSERT INTO ${tableName} (userId, userName) VALUES (?, ?)`;
    const result = await pool.query(query, [userId, userName]);

    return result ? statusUtil.success(result) : statusUtil.false();
  },*/
};

export default portfolio;