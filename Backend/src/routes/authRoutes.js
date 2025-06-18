import express from 'express';
import { loginTeacher } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginTeacher);

export default router;
