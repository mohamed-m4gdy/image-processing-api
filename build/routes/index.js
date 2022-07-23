"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resize_1 = __importDefault(require("./api/resize"));
const routes = (0, express_1.Router)();
routes.get('/', (_req, res) => {
    res.send('Welcome To Resizing Image API try to use this route http://localhost:3000/api/resize');
});
routes.use('/resize', resize_1.default);
exports.default = routes;
