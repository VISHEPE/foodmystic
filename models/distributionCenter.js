const db = require('../config/database');

class DistributionCenter {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM distribution_centers');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM distribution_centers WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(center) {
    const [result] = await db.query('INSERT INTO distribution_centers (name, address, capacity) VALUES (?, ?, ?)', [center.name, center.address, center.capacity]);
    return result.insertId;
  }

  static async update(id, center) {
    const [result] = await db.query('UPDATE distribution_centers SET name = ?, address = ?, capacity = ? WHERE id = ?', [center.name, center.address, center.capacity, id]);
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM distribution_centers WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = DistributionCenter;