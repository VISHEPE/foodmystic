const db = require('../config/database');

class Beneficiary {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM beneficiaries');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM beneficiaries WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(beneficiary) {
    const [result] = await db.query('INSERT INTO beneficiaries (name, contact, address) VALUES (?, ?, ?)', [beneficiary.name, beneficiary.contact, beneficiary.address]);
    return result.insertId;
  }

  static async update(id, beneficiary) {
    const [result] = await db.query('UPDATE beneficiaries SET name = ?, contact = ?, address = ? WHERE id = ?', [beneficiary.name, beneficiary.contact, beneficiary.address, id]);
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM beneficiaries WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Beneficiary;