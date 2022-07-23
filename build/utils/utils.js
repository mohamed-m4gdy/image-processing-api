"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageResize = exports.imageExists = exports.validate = void 0;
const fs_1 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
// Check thumb folder if exist or not
const validate = () => {
    if (!(0, fs_1.existsSync)('./assets/thumb')) {
        (0, fs_1.mkdirSync)('./assets/thumb');
    }
};
exports.validate = validate;
const imageExists = (req) => {
    const name = req.query.name;
    const width = req.query.width;
    const height = req.query.height;
    const fileLocation = './assets/thumb';
    const imageLocationInThumb = `${fileLocation}/${name}_${width}_${height}.jpg`;
    if ((0, fs_1.existsSync)(imageLocationInThumb)) {
        return [true, imageLocationInThumb];
    }
    else {
        return [false, imageLocationInThumb];
    }
};
exports.imageExists = imageExists;
const imageResize = (imagePath, width, height, path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(imagePath)
            .resize({ width: Number(width), height: Number(height), fit: 'cover' })
            .toFile(path)
            .then(() => {
            console.log("Image Resized");
        });
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
    ;
});
exports.imageResize = imageResize;
