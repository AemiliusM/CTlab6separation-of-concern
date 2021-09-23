const pool = require('../lib/utils/pool');
// const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then(res => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10
        });
      });
  });

  // sending post request with a quantity and use the get method to grab all the info from the tables
  //  
  it('gets all orders from /', async() => {
    await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });
    return await request(app)
      .get('/api/v1/orders')
      .then(res => {
        expect(res.body).toEqual([{
          id:'1',
          quantity: 10
        }]);
      });
  });

  it('gets orders from /id', async() => {
    await request(app)
      .post('/api/v1/orders')
      .send({ id:'1', quantity: 10 });
    await request(app)
      .post('/api/v1/orders')
      .send({ id:'2', quantity: 6 });
    return await request(app)
      .get('/api/v1/orders/1')
      .then(res => {
        expect(res.body).toEqual({
          id:'1',
          quantity: 10
        });
      });
  });

  it('updates an order from /id', async() => {
    await request(app)
      .post('/api/v1/orders')
      .send({ id:'1', quantity: 10 });
    return await request(app)
      .patch('/api/v1/orders/1')
      .send({ id:'1', quantity: 1000 })
      .then(res => {
        expect(res.body).toEqual({
          id:'1',
          quantity: 1000
        });
      });
  });
});
