import { pool } from "../db.js";

/*
add a new user

sample input:
{
  "user_type": "Student",
  "first_name": "Student FN",
  "middle_name": "Student MN",
  "last_name": "Student LN",
  "email": "student@up.edu.ph",
  "username": "Student UN",
  "contact_number": "0912-345-6789",
  "display_picture": "samplelink.com",
  "password": "sample password",
  "student_number": "2021-01234"
}
*/

const addUser = async (req, res) => {
  try {
    const userData = req.body; 
    const fields = Object.keys(userData);
    const values = Object.values(userData); 
    const placeholders = fields.map((_, i) => `$${i + 1}`).join(',');
    const query = `INSERT INTO user_account (${fields.join(',')}) VALUES(${placeholders}) RETURNING *`;
    const newUser = await pool.query(query, values);

    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error.');
  }
};

// get an existing user
const getUser = async (req, res) => {
  try {
      const { user_id } = req.params;
      const existingUser = await pool.query('SELECT * FROM user_account WHERE user_id = $1', [user_id]);
      
      res.json(existingUser.rows[0]);
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error.');
  }
};

/*
update an existing user

sample input:
{
  "username": "new Student UN",
  "contact_number": "0123-456-7890",
  "display_picture": "newsamplelink.com",
  "password": "new sample password"
}
*/

const updateUser = async (req, res) => {
  try {
      const { user_id } = req.params;
      const { username, contact_number, display_picture, password } = req.body;
      const query = 'UPDATE user_account SET username = $1, contact_number = $2, display_picture = $3, password = $4 WHERE user_id = $5';
      await pool.query(query, [username, contact_number, display_picture, password, user_id]);
      
      res.status(200).send("Successfully updated user.");
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error.');
  }
};

// delete an existing user
const deleteUser = async (req, res) => {
  try {
      const { user_id } = req.params;
      await pool.query("DELETE FROM user_account WHERE user_id = $1", [user_id]);
      
      res.status(200).send("Successfully deleted user.");
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error.');
  }
};

export {
  addUser,
  getUser,
  updateUser,
  deleteUser
};