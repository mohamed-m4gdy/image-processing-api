"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const utils_1 = require("./utils/utils");
const PORT = 3000;
// create an instance server
const app = (0, express_1.default)();
app.use('/api', routes_1.default);
// start express server
app.listen(PORT, () => {
    (0, utils_1.validate)();
    console.log(`Server is starting at prot:${PORT}`);
});
exports.default = app;
