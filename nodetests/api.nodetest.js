import { describe, test,  beforeEach, afterEach  } from 'node:test';
import request from 'supertest';
import app from '../apicalls.js';

beforeEach(async () => {
// Setup before every test in this file
})

afterEach( async () => {
// something after every test in this file
})

describe('GET /users', () => {
  test('responds with 200 & JSON', async () => {
    await request(app)
      .get('/users')
      .expect('Content-Type', /json/i)
      .expect(200);
  });
});

describe('GET /users/1', () => {
  test('responds 200 + JSON body equals expected object', async () => {
    const expected = { id: 1, forename: 'Roy', surname: 'Fielding' };

    await request(app)
      .get('/users/1')
      .expect('Content-Type', /json/i)  // header assertion
      .expect(200)                      // status assertion
      .expect(expected);                // deep-equals body assertion
  });
});

describe('POST /users', () => {
  test('creates a user and can be fetched by id', async () => {
    const newUser = { forename: 'New', surname: 'User' };

    // Create
    const createRes = await request(app)
      .post('/users')
      .send(newUser)
      .expect(201);                    // status assertion

    // Read back
    const getRes = await request(app)
      .get(`/users/3`)
      .expect('Content-Type', /json/i)
      .expect(200);

    // Validate payload
    if (getRes.body.forename !== newUser.forename) {
      throw new Error('forename mismatch');
    }
  });
});

describe('POST /users with not acceptable data', () => {
  test('responds 422 + JSON error payload', async () => {
    const badPayload = { firstname: 'New', surname: 'User' }; // missing "forename"

    await request(app)
      .post('/users')                       
      .send(badPayload)                     // sending an object sets Content-Type: application/json
      .expect('Content-Type', /json/i)      // header assertion (case-insensitive)
      .expect(422);                         // status assertion
  });
});

