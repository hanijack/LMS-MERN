import express from "express";
import { addCourse, getCoursesByMentor, getStudents, mentorDashboard, updateRole } from "../controllers/mentorControllers.js";
import upload from "../config/multer.js";
import { protectedMentor } from "../middlewares/auth.js";


const mentorRouter = express.Router();

mentorRouter.get('/update-role', updateRole);
mentorRouter.post('/add-course', upload.single('image'), protectedMentor, addCourse);
mentorRouter.get('/courses', protectedMentor, getCoursesByMentor);   
mentorRouter.get('/dashboard', protectedMentor, mentorDashboard);
mentorRouter.get('/students-enrolled', protectedMentor, getStudents);
export default mentorRouter;