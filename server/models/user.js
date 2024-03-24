import { pool } from '../db.js';

const User = {};

// add a new user
User.create = (userData) => {
  const fields = Object.keys(userData);
  const values = Object.values(userData);
  const placeholders = fields.map((_, i) => `$${i + 1}`).join(',');
  const query = `INSERT INTO user_account (${fields.join(',')}) VALUES(${placeholders}) RETURNING *`;
  return pool.query(query, values);
};

// get an existing user
User.get = (userId) => {
  return pool.query('SELECT * FROM user_account WHERE user_id = $1', [userId]);
};

// update an existing user
User.update = (userId, { username, contact_number, display_picture, password }) => {
  const query = 'UPDATE user_account SET username = $1, contact_number = $2, display_picture = $3, password = $4 WHERE user_id = $5';
  return pool.query(query, [username, contact_number, display_picture, password, userId]);
};

// delete an existing user
User.delete = (userId) => {
  return pool.query('DELETE FROM user_account WHERE user_id = $1', [userId]);
};

export default User;