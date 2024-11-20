const db = require('../config/database');

class Donor {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM donors');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM donors WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(donor) {
    const [result] = await db.query(
      'INSERT INTO donors (name, contact, email, image) VALUES (?, ?, ?, ?)',
      [donor.name, donor.contact, donor.email, donor.image]
    );
    return result.insertId;
  }

  static async update(id, donor) {
    const [result] = await db.query(
      'UPDATE donors SET name = ?, contact = ?, email = ?, image = ? WHERE id = ?',
      [donor.name, donor.contact, donor.email, donor.image, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM donors WHERE id = ?', [id]);
    return result.affectedRows;
  }
}


module.exports = Donor;