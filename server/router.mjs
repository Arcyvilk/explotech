import express from 'express';
export const router = express.Router();

import { login } from './routes.mjs';

router.post('/login', login);
