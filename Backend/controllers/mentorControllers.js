import { clerkClient } from "@clerk/express";
import Course from "../models/Course.js";
import { v2 as cloudinary } from "cloudinary";
import Purchase from "../models/Purchase.js";
import streamifier from "streamifier";
import User from "../models/User.js";




export const updateRole = async (req, res) => {
    try {
        const userId  = req.auth.userId;
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: { role: "mentor" }
        })
        res.json({ message: "Role updated to mentor" });
    } catch (error) {
        res.json({ message: "Error updating role", error: error.message });
    }
}

export const addCourse = async (req , res) =>{
    try {
        const {courseData} = req.body
        const image = req.file
        const {userId} = req.auth()

        if(!image){
            return res.status(400).json({message:"Thumbnail is required"})
        }
        const Data = await JSON.parse(courseData)
        Data.instructor = userId
        
         const uploadStream = cloudinary.uploader.upload_stream(
            {folder :"courses"},
            async(error , result)=>{
                if(error){
                    return res.json({message:"Image upload failed" , error:error.message})
                }
                Data.thumbnail = result.secure_url
                const newCourse = await Course.create(Data)
                res.status(201).json({message:"Course created successfully" , success:true})
            }
        )
    
        streamifier.createReadStream(image.buffer).pipe(uploadStream)
      
        
    } catch (error) {
        res.json({message:"Error creating course" , error:error.message , details: error.errors || null})
    }
}

export const getCoursesByMentor = async (req , res) =>{
    try {
        const {userId} = req.auth()
        const courses = await Course.find({instructor:userId})
        res.json(courses)
    } catch (error) {
        res.json({message:"Error fetching courses" , error:error.message})
    }
}

export const mentorDashboard = async (req, res) => {
    try {
        const {userId} = req.auth()
        const courses = await Course.find({instructor: userId });
        const totalCourses = courses.length;
        const corsesIds = courses.map((course) => course._id);

        const purchases = await Purchase.find({ course: { $in: corsesIds }});
        const totalEarnings = purchases.reduce((total, purchase) => total + purchase.amount, 0);

        const studentsData = [];
        for(const course of courses){
            const students = await User.find({
                _id:{$in:course.studentsEnrolled}
            }, "name imageUrl")
            students.forEach((student)=>{
                studentsData.push({
                    courseTitle:course.title,
                    student
                })
            })
        }
        res.json( {success:true ,dashboardData:{totalEarnings , totalCourses, studentsData}});
    } catch (error) {
        res.json({ message: "Error fetching dashboard data", error: error.message });
    }
}

export const getStudents = async (req, res) => {
    try {
        const {userId} = req.auth()
        const courses = await Course.find({instructor:userId})
        const coursesIds = courses.map((course) => course._id);
        const purchases = await Purchase.find({ course: { $in: coursesIds }, status: "completed" }).populate("userId", "name imageUrl email").populate("courseId" , "title");
        const students = purchases.map((purchase) => ({
            student: purchase.userId,
            course : purchase.courseId.title,
            purchaseDate: purchase.createdAt
        }))
        res.json( {success:true , students})
    } catch (error) {
        res.json({ message: "Error fetching students", error: error.message });
    }
}

