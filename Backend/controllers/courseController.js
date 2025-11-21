import Course from "../models/Course.js";



export const getCourses= async (req , res) =>{
    try {
        const courses = await Course.find().select
        (["-content","-studentsEnrolled"]).populate("instructor")
        res.json({success:true , courses})
    } catch (error) {
     res.json({success:false , message:error.message})   
    }
}


export const getCourseById = async (req , res) =>{
    try {
        const {id} = req.params;
        console.log(id)
        const course = await Course.findById(id).populate("instructor").populate("studentsEnrolled")
        if(!course) return res.json({success:false , message:"Course not found"})
            console.log(course)
        res.json({success:true , course})
    } catch (error) {
        res.json({success:false , message:error.message})   
    }   
}