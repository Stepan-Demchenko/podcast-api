const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../app');
const User = require('../models/user');

describe('Auth controller test', () => {
  beforeEach(done => {
    User.deleteMany({})
      .exec()
      .then(() => {
        const testUser = new User({
          name: 'test name',
          nickName: 'testNick',
          about: 'test about',
          email: 'test@gmail.com',
          password: '123123'
        });

        return testUser.save();
      })
      .finally(done);
  });

  it('Sign in with unexisting user gives 404 error', () => {
    return request(app)
      .post(`/api/auth/login`)
      .send({
        email: 'test121@gmail.com',
        password: '123123'
      })
      .then(res => {
        expect(res.status).to.eq(404);
      });
  });

  it('Sign in with existing user gives 200 status & token', () => {
    return request(app)
      .post(`/api/auth/login`)
      .send({
        email: 'test@gmail.com',
        password: '123123'
      })
      .then(res => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('token');
      });
  });

  it('Sign in with invalid password gives 401 error', () => {
    return request(app)
      .post(`/api/auth/login`)
      .send({
        email: 'test@gmail.com',
        password: 'invlaid password'
      })
      .then(res => {
        expect(res.status).to.eq(401);
      });
  });

  /* it('Can sign up successfully', () => {
    return request(app)
      .post(`/api/auth/register`)
      .send({
        /* name: 'test name',
        nickName: 'testNick',
        about: 'test about', */
        email: 'test121@gmail.com',
        password: '123123'
      })
      .then(res => {
        console.log('res', res);
      });
  }); */
});
