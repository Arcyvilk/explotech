import express from 'express';
export const router = express.Router();

import { login } from './routes.mjs';
import { getCache, deleteCache } from './routes.mjs';

router.post('/login', login);
router.get('/cache', getCache);
router.delete('/cache', deleteCache);
