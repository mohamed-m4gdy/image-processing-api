import express from "express";
import { existsSync, mkdirSync } from "fs";
import sharp from 'sharp';

// Check thumb folder if exist or not
const validate = (): void => {
    if (!existsSync('./assets/thumb')) {
        mkdirSync('./assets/thumb');
    }
};

const imageExists = (req: express.Request): [boolean, string] => {
    const name = req.query.name as string;
    const width = req.query.width as string;
    const height = req.query.height as string;
    const fileLocation = './assets/thumb';
    const imageLocationInThumb = `${fileLocation}/${name}_${width}_${height}.jpg`;

    if (existsSync(imageLocationInThumb)) {
        return [true, imageLocationInThumb];
    } else {
        return [false, imageLocationInThumb];
    }
}

const imageResize = async (
    imagePath: string,
     width: number,
     height: number,
     path: string): Promise<boolean> => {
    try {
        await sharp(imagePath)
        .resize({ width: Number(width), height: Number(height), fit: 'cover' })
        .toFile(path)
        .then(() => {
            console.log("Image Resized");
        });
        return true;
    } catch (err) {
        console.log(err)
        return false;
    };
};
  



export { validate, imageExists, imageResize };
