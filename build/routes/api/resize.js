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
const express_1 = __importDefault(require("express"));
const utils_1 = require("../../utils/utils");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const resize = express_1.default.Router();
resize.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cash = (0, utils_1.imageExists)(req);
    if (!cash[0]) {
        const imageLocation = `./assets/full/${req.query.name}.jpg`;
        const width = Number(req.query.width);
        const height = Number(req.query.height);
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
        }
        ;
        // If the image name is wrong
        if (!(0, fs_1.existsSync)(imageLocation)) {
            const exitsImages = (0, fs_1.readdirSync)('./assets/full/');
            res.status(404).end(`Image Not Found Exits Images Is ${exitsImages}`);
            return;
        }
        else {
            // resize image if the image
            const resizedImage = yield (0, utils_1.imageResize)(imageLocation, width, height, cash[1]);
            if (resizedImage) {
                res.sendFile(path_1.default.resolve(cash[1]), (err) => {
                    if (err) {
                        console.log(err);
                        res.send(err.message);
                    }
                });
            }
            else {
                res.status(422).send('Something Wrong');
                return;
            }
            ;
        }
    }
    else {
        res.sendFile(path_1.default.resolve(cash[1]), (err) => {
            if (err) {
                res.send(err.message);
            } /* else {
              console.log('test');
            }*/
        });
    }
}));
exports.default = resize;
