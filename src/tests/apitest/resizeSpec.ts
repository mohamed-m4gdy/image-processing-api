import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Testing the image processing endpoint', () => {
  it('Using the endpoint without parameters returns 400', async () => {
    await request.get('/resize').expect(400);
  });

  it('Using the endpoint with a missing parameters returns 400', async () => {
    await request.get('/resize?name=wrong').expect(400);
  });

  it('Using the endpoint with a wrong parameter name returns 400', async () => {
    await request.get('/resize?wrong=encenadaport&width=150&height=150').expect(400);
  });

  it('Using the endpoint with a valid parameters but name does not have a photo returns 404', async () => {
    await request.get('/resize?name=noimage&width=150&height=150').expect(404);
  });

  it('Using the endpoint with a valid lead returns 200', async () => {
    await request.get('/resize?name=encenadaport&width=150&height=150').expect(200);
  });
});
