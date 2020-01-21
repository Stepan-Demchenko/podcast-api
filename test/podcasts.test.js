require('colors');
const fs = require('fs');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../app');
const { genereateToken } = require('../utils/generateToken');
const mongoose = require('mongoose');
const categoriesSeedingFunction = require('../seeding/categories.seed');
const usersSeedingFunction = require('../seeding/users.seed');

let categories;
let users;
let mockImagesPaths = [];
let mockAudioPath = '';

describe('Podcast controller test'.green.bold, () => {
  beforeEach(done => {
    mongoose.connection.db
      .dropDatabase()
      .then(() => {
        return Promise.all([
          categoriesSeedingFunction(),
          usersSeedingFunction()
        ]);
      })
      .then(([categoriesResp, usersResp]) => {
        categories = categoriesResp;
        users = usersResp;
      })
      .finally(done);
  });

  afterEach(() => {
    if (fs.existsSync(mockAudioPath)) {
      fs.unlinkSync(mockAudioPath);
    }

    mockImagesPaths.forEach(mockImagePath => {
      if (fs.existsSync(mockImagePath)) {
        fs.unlinkSync(mockImagePath);
      }
    });
  });

  it('Add podcast with token is successfull', () => {
    return request(app)
      .post('/api/podcasts')
      .set({ authorization: `Bearer ${genereateToken(users[0])}` })
      .field('title', 'test title')
      .field('description', 'test description')
      .field('categories[0]', `${categories[0]._id}`)
      .field('categories[1]', `${categories[1]._id}`)
      .attach('images', './test/fixtures/test-image.png')
      .attach('audio', './test/fixtures/test.mp3')
      .then(response => {
        /* Save this to vars to delete test files */
        mockAudioPath = response.body.data.audioSrc;
        mockImagesPaths = response.body.data.imagesSrc;
        expect(response.status).to.eq(201);
        expect(response.body.data).to.deep.include({
          title: 'test title',
          description: 'test description',
          categories: [`${categories[0]._id}`, `${categories[1]._id}`]
        });
        expect(response.body.data.imagesSrc.length).to.eq(1);
      });
  });
  it('Add podcast without token returns 401 status', () => {
    return request(app)
      .post('/api/podcasts')
      .field('title', 'test title')
      .field('description', 'test description')
      .field('categories[0]', `${categories[0]._id}`)
      .field('categories[1]', `${categories[1]._id}`)
      .attach('images', './test/fixtures/test-image.png')
      .attach('audio', './test/fixtures/test.mp3')
      .then(response => {
        expect(response.status).to.eq(401);
      });
  });
});
