import express from 'express';
import { getPollsByTeacher } from '../controllers/pollController.js';

const router = express.Router();

router.get('/:teacherUsername', getPollsByTeacher);

export default router;
