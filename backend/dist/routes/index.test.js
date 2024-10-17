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
// src/tests/index.test.ts
const vitest_1 = require("vitest");
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("../routes/index"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use('/', index_1.default); // Gắn các route từ indexRoutes vào app
(0, vitest_1.describe)('Test index route', () => {
    (0, vitest_1.it)('should return a JSON response with a message', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/'); // Gửi yêu cầu GET tới '/'
        console.log(response);
        (0, vitest_1.expect)(response.status).toBe(200); // Kiểm tra mã trạng thái HTTP
        (0, vitest_1.expect)(response.body).toEqual({ message: 'Hello this text comes from Back-end!' }); // Kiểm tra nội dung phản hồi
    }));
});
