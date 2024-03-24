import User from '../models/user.js';

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
    const newUser = await User.create(req.body);
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
    const existingUser = await User.get(user_id);
    res.json(existingUser.rows[0]);
  } catch (error) {
    console.error(error.message);
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
    await User.update(user_id, req.body);
    res.status(200).send("Successfully updated user.");
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error.');
  }
};

// delete an existing user
const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    await User.delete(user_id);
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