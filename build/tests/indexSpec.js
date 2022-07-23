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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const utils_1 = require("../utils/utils");
const request = (0, supertest_1.default)(index_1.default);
const name = 'fjord';
const width = 150;
const height = 150;
describe('Image Processing API Test', () => {
    it('Get / without query parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api');
        expect(response.status).toBe(200);
    }));
    it('image resize successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/api/resize?name=${name}&width=${width}&height=${height}`);
        expect(response.status).toBe(200);
    }));
    it('Get /api/resize with missing query parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/api/resize?name=${name}&width=${width}`);
        expect(response.status).toBe(400);
    }));
});
describe('Image Resize Function', () => __awaiter(void 0, void 0, void 0, function* () {
    const fullPath = './assets/full';
    const thumbPath = './assets/thumb';
    it('Trying out existing image file to check funcitonality', () => __awaiter(void 0, void 0, void 0, function* () {
        const success = yield (0, utils_1.imageResize)(`${fullPath}/${name}.jpg`, width, height, `${thumbPath}/${name}_${width}_${height}.jpg`);
        expect(success).toBe(true);
    })),
        it('Trying out passing erroneous parameters to make sure function catches erros.', () => __awaiter(void 0, void 0, void 0, function* () {
            const success = yield (0, utils_1.imageResize)(`${fullPath}/test.jpg`, width, height, `${thumbPath}/test_${width}_${height}.jpg`);
            expect(success).toBe(false);
        }));
}));
