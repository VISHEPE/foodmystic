const bcrypt = require('bcrypt');
const db = require('../config/database'); // Adjust the path based on your project structure

async function createAdmin(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO admins (email, password) VALUES (?, ?)', [email, hashedPassword]);
}

module.exports = { createAdmin };
