const db = require('../config/database');

class DeliveryRecord {
  static async getAll() {
    const [rows] = await db.query(`
      SELECT dr.*, d.name as donor_name, b.name as beneficiary_name, dc.name as center_name, ft.name as food_type_name 
      FROM delivery_records dr
      JOIN donors d ON dr.donor_id = d.id
      JOIN beneficiaries b ON dr.beneficiary_id = b.id
      JOIN distribution_centers dc ON dr.distribution_center_id = dc.id
      JOIN food_types ft ON dr.food_type_id = ft.id
    `);
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query(`
      SELECT dr.*, d.name as donor_name, b.name as beneficiary_name, dc.name as center_name, ft.name as food_type_name 
      FROM delivery_records dr
      JOIN donors d ON dr.donor_id = d.id
      JOIN beneficiaries b ON dr.beneficiary_id = b.id
      JOIN distribution_centers dc ON dr.distribution_center_id = dc.id
      JOIN food_types ft ON dr.food_type_id = ft.id
      WHERE dr.id = ?
    `, [id]);
    return rows[0];
  }

  static async create(record) {
    const [result] = await db.query('INSERT INTO delivery_records (donor_id, beneficiary_id, distribution_center_id, food_type_id, quantity, delivery_date) VALUES (?, ?, ?, ?, ?, ?)', 
      [record.donor_id, record.beneficiary_id, record.distribution_center_id, record.food_type_id, record.quantity, record.delivery_date]);
    return result.insertId;
  }

  static async update(id, record) {
    const [result] = await db.query('UPDATE delivery_records SET donor_id = ?, beneficiary_id = ?, distribution_center_id = ?, food_type_id = ?, quantity = ?, delivery_date = ? WHERE id = ?', 
      [record.donor_id, record.beneficiary_id, record.distribution_center_id, record.food_type_id, record.quantity, record.delivery_date, id]);
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM delivery_records WHERE id = ?', [id]);
    return result.affectedRows;
  }

  static async getRecent(limit = 5) {
    const [rows] = await db.query(`
      SELECT dr.*, d.name as donor_name, ft.name as food_type_name 
      FROM delivery_records dr
      JOIN donors d ON dr.donor_id = d.id
      JOIN food_types ft ON dr.food_type_id = ft.id
      ORDER BY dr.delivery_date DESC
      LIMIT ?
    `, [limit]);
    return rows;
  }
}

module.exports = DeliveryRecord;