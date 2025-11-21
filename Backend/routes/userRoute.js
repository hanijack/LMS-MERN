import express from 'express';
import { addRating, getUser,  purchaseCourse, userCourses } from '../controllers/userControllers.js';


const userRouter = express.Router(); 

userRouter.get("/", getUser)
userRouter.get("/enrolled-courses" , userCourses)
userRouter.post("/purchase" , purchaseCourse)
userRouter.post("/add-rating" , addRating)

export default userRouter;