import statusUtil from "../../utils/statusUtil";
import pool from "../pool";

const tableName = "user";

const user = {
  selectAll: async () => {
    const query = `SELECT * FROM ${tableName}`;
    const result = await pool.query(query);

    return result ? statusUtil.success(result) : statusUtil.false();
  },
  insert: async (userId, userName) => {
    const query = `INSERT INTO ${tableName} (userId, userName) VALUES (?, ?)`;
    const result = await pool.query(query, [userId, userName]);

    return result ? statusUtil.success(result) : statusUtil.false();
  },
};

export default user;