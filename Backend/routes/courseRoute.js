import express from 'express';
import { getCourseById, getCourses } from '../controllers/courseController.js';

const courseRouter = express.Router();




courseRouter.get("/" , getCourses);
courseRouter.get("/:id" ,getCourseById )





export default courseRouter;