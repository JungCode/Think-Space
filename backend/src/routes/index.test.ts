// src/tests/index.test.ts
import { it, expect, describe } from 'vitest';
import express from 'express';
import request from 'supertest';
import cors from 'cors';
import indexRoutes from '../routes/index';
import app from '../app';

describe('Test index route', () => {
  it('should return a JSON response with a message', async () => {
    const response = await request(app).get('/'); // Gửi yêu cầu GET tới '/'
    expect(response.status).toBe(200); // Kiểm tra mã trạng thái HTTP
    expect(response.body[0]).toMatchObject({
      id: expect.any(String),      // Kiểm tra id là một chuỗi
      username: expect.any(String) // Kiểm tra username là một chuỗi
    });

  });
});
