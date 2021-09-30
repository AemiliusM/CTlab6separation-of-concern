const { Router } = require('express');
const OrderService = require('../services/OrderService');

module.exports = Router()
  .post('/', async(req, res, next) => {
    try {
      const order = await OrderService.createOrder(req.body);
      res.send(order);
    } catch(err) {
      next(err);
    }
  })
//   sends off to Orderservices
  .get('/', async(req, res, next) => {
    try {
      const order = await OrderService.getAllOrders();
      res.send(order);
    } catch(err) {
      next(err);
    }
  })

  .get('/:id', async(req, res, next) => {
    try {
      const id = req.params.id;
      const order = await OrderService.getOneOrder(id);
      res.send(order);
    } catch(err) {
      next(err);
    }

  })

  .patch('/:id', async(req, res, next) => {
    try {
      const id = req.params.id;
      const order = await OrderService.patchOneOrder(req.body, id);
      res.send(order);
    } catch(err) {
      next(err);
    }


  })

  .delete('/:id', async(req, res, next) => {
    try {
      const id = req.params.id;
      console.log(id);
      const order = await OrderService.deleteOneOrder(id);
      res.send(order);
    } catch(err) {
      next(err);
    }
  });

