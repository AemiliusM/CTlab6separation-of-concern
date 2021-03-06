const pool = require('../utils/pool');

module.exports = class Order {
  id;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
  }

  static async insert({ quantity }) {
    const { rows } = await pool.query(
      'INSERT INTO orders (quantity) VALUES ($1) RETURNING *',
      [quantity]
    );
    return new Order(rows[0]);
  }

  static async gatherAll() {
    const { rows } = await pool.query(
      'SELECT * FROM orders'
    );
    return rows.map((row) => {
      return new Order(row);
    });
  }

  static async gatherOne(id) {
    const { rows } = await pool.query('SELECT * FROM orders WHERE orders.id = ($1)', [id]);
    return new Order(rows[0]);
  }

  static async changeOne(quantity, id) {
    const { rows } = await pool.query('Update orders SET quantity = ($1) WHERE id = ($2) RETURNING *;', 
      [quantity, id]); return new Order(rows[0]);
  }

  static async deleteOne(id) {
    const { rows } = await pool.query(`Delete FROM orders WHERE id = ${id} RETURNING *`);
    return new Order(rows[0]);
  }
};
