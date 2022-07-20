import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Testing the endpoint', () => {
  it('Testing the endpoint and returns 200', async () => {
    await request.get('/').expect(200);
  });
});
