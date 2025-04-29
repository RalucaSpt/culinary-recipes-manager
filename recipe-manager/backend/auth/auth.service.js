const bcrypt = require('bcrypt');
const { createUser, findUserByEmail } = require('../users/user.model');

// Înregistrare
async function register(email, password) {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    const error = new Error('Email already exists');
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser(email, hashedPassword);
  return user;
}

// Autentificare
async function login(email, password) {
  const user = await findUserByEmail(email);
  if (!user) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }

  return user;
}

module.exports = {
  register,
  login
};
