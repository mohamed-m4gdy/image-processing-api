import supertest from 'supertest';
import app from '../index';
import { imageResize } from '../utils/utils';

const request = supertest(app);

const name = 'fjord';
const width = 150;
const height = 150;

describe('Image Processing API Test', () => {
  it('Get / without query parameters', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/api');
    expect(response.status).toBe(200);
  });

  it('image resize successfully', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      `/api/resize?name=${name}&width=${width}&height=${height}`
    );
    expect(response.status).toBe(200);
  });

  it('Get /api/resize with missing query parameter', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      `/api/resize?name=${name}&width=${width}`
    );
    expect(response.status).toBe(400);
  });
});


describe('Image Resize Function', async (): Promise<void> => {
  const fullPath = './assets/full';
  const thumbPath = './assets/thumb';
  it('Trying out existing image file to check funcitonality', async (): Promise<void> => {
    const success = await imageResize(
      `${fullPath}/${name}.jpg`,
      width,
      height,
      `${thumbPath}/${name}_${width}_${height}.jpg`
    );
    expect(success).toBe(true);
  }),
    it('Trying out passing erroneous parameters to make sure function catches erros.', async (): Promise<void> => {
      const success = await imageResize(
        `${fullPath}/test.jpg`,
        width,
        height,
        `${thumbPath}/test_${width}_${height}.jpg`
      );
      expect(success).toBe(false);
    });
});
