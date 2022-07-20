import { Router, Request, Response } from 'express';
import resize from './api/resize';

const routes = Router();

routes.get('/', (_req: Request, res: Response) => {
  res.send('Welcome To Resizing Image API');
});

routes.use('/resize', resize);

export default routes;
