const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  //send a text and store the order

  static async createOrder({ quantity }) {
    //send text
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    //store the order
    const order = await Order.insert({ quantity });

    return order;
  }
  // send off to Order
  static async getAllOrders() {
    const order = await Order.gatherAll();
    return order;
  }

  static async getOneOrder(id) {
    const order = await Order.gatherOne(id);
    return order;
  }

  static async patchOneOrder({ quantity }, id) {
    const order = await Order.changeOne(quantity, id);
    return order;
  }
};
