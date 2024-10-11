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
    const [result] = await db.query('INSERT INTO donors (name, contact, address) VALUES (?, ?, ?)', [donor.name, donor.contact, donor.address]);
    return result.insertId;
  }

  static async update(id, donor) {
    const [result] = await db.query('UPDATE donors SET name = ?, contact = ?, address = ? WHERE id = ?', [donor.name, donor.contact, donor.address, id]);
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM donors WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Donor;