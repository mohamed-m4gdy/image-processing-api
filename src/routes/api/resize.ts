import express from 'express';
import { imageExists, imageResize } from '../../utils/utils'
import path from 'path';
import { existsSync, readdirSync} from 'fs';

const resize = express.Router();

resize.get('/', async (req: express.Request, res: express.Response): Promise<void> => {

  const cash = imageExists(req);

  if (!cash[0]) {
    const imageLocation = `./assets/full/${req.query.name}.jpg`
    const width = Number(req.query.width as string);
    const height = Number(req.query.height as string);


    // Handling errors if width or height is undefined or missing
    if (isNaN(width) || isNaN(height)) {
      if (isNaN(width)) {
        res.status(400).send('Width Parameter Is Missing');
      }
      if (isNaN(height)) {
        res.status(400).send('Height Parameter Is Missing');
      }
      res.end();
      return;
    };

    // If the image name is wrong
    if (!existsSync(imageLocation)) {
      const exitsImages = readdirSync('./assets/full/');

      res.status(404).end(`Image Not Found Exits Images Is ${exitsImages}`);
      return;
    } else {
      // resize image if the image
      const resizedImage = await imageResize(imageLocation, width, height, cash[1]);
      if (resizedImage) {
        res.sendFile(path.resolve(cash[1]), (err) => {
          if(err) {
            console.log(err);
            res.send(err.message);
          }
        });
      } else {
        res.status(422).send('Something Wrong');
        return
      };
    }
  } else {
    res.sendFile(path.resolve(cash[1]), (err) => {
      if (err) {
        res.send(err.message);
      }/* else {
        console.log('test');
      }*/
    });
  }
});

export default resize;
