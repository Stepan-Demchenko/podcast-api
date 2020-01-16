const { SECRET_KEY, ACCESS_TOKEN_EXP_TIME } = require('../config');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../app');
const mongoose = require('mongoose');
const categoriesSeedingFunction = require('../seeding/categories.seed');
const usersSeedingFunction = require('../seeding/users.seed');
const jwt = require('jsonwebtoken');
require('colors');

let user;
let category;

const genereateToken = user => {
  return jwt.sign(
    {
      email: user.email,
      userId: user._id
    },
    SECRET_KEY,
    { expiresIn: ACCESS_TOKEN_EXP_TIME }
  );
};
describe('Categories controller test'.green.bold, () => {
  beforeEach(done => {
    mongoose.connection.db
      .dropDatabase()
      .then(() => {
        return Promise.all([
          categoriesSeedingFunction(),
          usersSeedingFunction()
        ]);
      })
      .then(([categories, users]) => {
        category = categories[0];
        user = users[0];
      })
      .finally(done);
  });

  it('Returns all categories', () => {
    return request(app)
      .get('/api/categories')
      .then(res => {
        expect(res.status).to.eq(200);
      });
  });

  it('Add category without token returns 401', () => {
    return request(app)
      .post('/api/categories')
      .send({
        name: 'not allowed without token',
        description: 'description not allowed without token'
      })
      .then(res => {
        expect(res.status).to.eq(401);
      });
  });

  it('Add category with token is successfull', () => {
    return request(app)
      .post('/api/categories')
      .set({ authorization: `Bearer ${genereateToken(user)}` })
      .send({
        name: 'can add category name',
        description: 'can add category description'
      })
      .then(res => {
        expect(res.status).to.eq(201);
        expect(res.body.data[0]).to.include({
          name: 'can add category name',
          description: 'can add category description'
        });
      });
  });

  it('Delete category without token returns 401', () => {
    return request(app)
      .delete(`/api/categories/${category._id}`)
      .then(res => {
        expect(res.status).to.eq(401);
      });
  });

  it('Delete category with token is successfull', () => {
    return request(app)
      .delete(`/api/categories/${category._id}`)
      .set({ authorization: `Bearer ${genereateToken(user)}` })
      .then(res => {
        expect(res.status).to.eq(200);
      });
  });
});
