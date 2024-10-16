// src/tests/index.test.ts
import { it, expect, describe } from 'vitest';
import express from 'express';
import request from 'supertest';
import cors from 'cors';
import indexRoutes from '../routes/index';

const app = express();
app.use(cors());
app.use('/', indexRoutes); // Gắn các route từ indexRoutes vào app

describe('Test index route', () => {
  it('should return a JSON response with a message', async () => {
    const response = await request(app).get('/'); // Gửi yêu cầu GET tới '/'
		console.log(response);
    expect(response.status).toBe(200); // Kiểm tra mã trạng thái HTTP
    expect(response.body).toEqual({ message: 'Hello this text comes from Back-end!' }); // Kiểm tra nội dung phản hồi
  });
});
