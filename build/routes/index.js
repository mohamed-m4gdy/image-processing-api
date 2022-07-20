"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var resize_1 = __importDefault(require("./api/resize"));
var routes = (0, express_1.Router)();
routes.get('/', function (_req, res) {
    res.send('Welcome To Resizing Image API');
});
routes.use('/resize', resize_1.default);
exports.default = routes;
