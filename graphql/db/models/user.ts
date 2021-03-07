import statusUtil from "../../utils/statusUtil";
const { User } = require('../../../sqlz/models/index');

const user = {
  selectAll: async () => {
    const result = await User.findAll();
    return result ? statusUtil.success(result) : statusUtil.false();
  },
  /*
  insert: async (userId, userName) => {
    const query = `INSERT INTO ${tableName} (userId, userName) VALUES (?, ?)`;
    const result = await pool.query(query, [userId, userName]);

    return result ? statusUtil.success(result) : statusUtil.false();
  },*/
};

export default user;