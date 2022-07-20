import { Router, Request, Response } from 'express';
import path from 'path';
import fs, { existsSync } from 'fs';
import sharp from 'sharp';

const resize = Router();

resize.get('/', async (req: Request, res: Response) => {
  const name = req.query.name as string;
  const width = req.query.width as string;
  const height = req.query.height as string;
  const imageLocation = path.resolve('./') + `/images/${name}.jpg`;

  // check if the folder doesn't exist
  if (!fs.existsSync('./images/thumb')) {
    fs.mkdirSync('./images/thumb');
  }
  // If the parameter is wrong
  if (name === undefined || width === undefined || height === undefined) {
    return res.status(400).send('Parameters Not Found Or Parameters Missing');
  }

  // If the image name is wrong
  if (existsSync(imageLocation) === false) {
    return res.status(404).send('Image Not Found');
  }

  // Resizing Image
  await sharp(imageLocation)
    .resize({ width: Number(width), height: Number(height), fit: 'cover' })
    .toFile(`./images/thumb/${name}_${height}_${width}.jpg`);
  const resizedImage = path.resolve('./') + `/images/thumb/${name}_${height}_${width}.jpg`;

  // Return Image
  res.sendFile(resizedImage);
});

export default resize;
