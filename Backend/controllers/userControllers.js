import Stripe from "stripe";
import User from "../models/User.js";
import Course from "../models/Course.js";
import CourseProgress from "../models/CourseProgress.js";
import Purchase from "../models/Purchase.js";



export const getUser = async (req, res) => {
    try {
    const {userId} = req.auth()   
    const user = await User.findById( userId );
        if(!user) {
            return res.status(404).json({ message: "User not found" });   
        }
        res.status(200).json(user);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const userCourses = async (req, res) => {
    try {
        const {userId} = req.auth()
        const courses= User.findById(userId).populate("enrolledCourses");
        res.json(courses.enrolledCourses);
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const purchaseCourse = async (req, res) => {
    try {
        const {courseId} = req.body;
        const {userId} = req.auth()
        const {origin}= req.headers;
        const user = await User.findById(userId);
        const course = await Course.findById(courseId);

        if(!user || !course){
            return res.json({message: "User or Course not found"});
        }
        const purchaseData = {
            courseId: course._id,
            userId , 
            amount:Number((course.price - course.price * course.discount/100).toFixed(2)),
        }
        const newPurchase = await Purchase.create(purchaseData)

        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
        const currency = "usd"
        const line_items = [{
            price_data: {
                currency,
                product_data:{
                    name: course.title,
                },
                unit_amount: Math.floor(purchaseData.amount) * 100,
            },
            quantity: 1,
        }]
        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/payment-success`,
            cancel_url: `${origin}/payment-failure`,
            mode: "payment",
            line_items: line_items,
            metadata: {
                purchaseId: newPurchase._id.toString(),
            }
        })
      

        res.json({success:true ,url: session.url})

    } catch (error) {
        res.json({ message: error.message })
    }
}








export const addRating = async(req , res)=>{
    const {userId} = req.auth()
    const {courseId , rating} =req.body
    if(!userId || !rating || !courseId || rating < 1 || rating>5){
       return res.json({message: "Invalid data provided"});
    }
    try {
        const course = await Course.findById(courseId);
        if(!course){
            return res.json({message: "Course not found"});
        }
        const user = await User.findById(userId);
        if(!user ||!user.enrolledCourses.includes(courseId)){
            return res.json({message: "User is not enrolled in this course"});
        }
        const exstingRating = course.ratings.findIndex(r => r.userId === userId);
        if(exstingRating > -1){
            course.ratings[exstingRating].rating = rating;

        }else{
            course.ratings.push({userId , rating});
        }
        await course.save();
        return res.json({message: "Rating added successfully"});
    } catch (error) {
        res.json({message: error.message})
    }
}