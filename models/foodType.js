const db = require('../config/database');

class FoodType {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM food_types');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM food_types WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(foodType) {
    const [result] = await db.query('INSERT INTO food_types (name, category) VALUES (?, ?)', [foodType.name, foodType.category]);
    return result.insertId;
  }

  static async update(id, foodType) {
    const [result] = await db.query('UPDATE food_types SET name = ?, category = ? WHERE id = ?', [foodType.name, foodType.category, id]);
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM food_types WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = FoodType;