import { Webhook } from "svix";
import User from "../models/User.js";
import Stripe from "stripe";
import Purchase from "../models/Purchase.js";
import Course from "../models/Course.js";


const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export const handleWebhook = async (req, res) => {
    try {
        const wh = new Webhook(webhookSecret);
        await wh.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });
        const {data , type} = req.body;
        if(type === "user.created"){
            
            const newUser = {
                _id:data.id,
                email:data.email_addresses[0].email_address,
                name:data.first_name + " " + data.last_name,
                imageUrl:data.image_url
            };
            await User.create(newUser);
            res.json({message:"User created successfully"});
        }
        if(type === "user.updated"){
            const userData = {
                email:data.email_addresses[0].email_address,
                name:data.first_name + " " + data.last_name,
                imageUrl:data.image_url
            }
            const user = await User.findByIdAndUpdate(data.id, userData, {new:true});
            res.json({message:"User updated successfully", user})
            }
        if(type === "user.deleted"){
            await User.findByIdAndDelete(data.id);
            res.json({message:"User deleted successfully"});
        }

        } catch (error) {
        res.status(400).json({message:"Webhook Error", error: error.message});
    }
}
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
 export  const  stripeWebhook = async(req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = Stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.sendStatus(400);
    }
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            const paymentId = paymentIntent.id;
            const session = await stripe.checkout.sessions.list({
                payment_intent: paymentId,
            })
            const purchaseId = session.data[0].metadata.purchaseId;
            const purchaseData = await Purchase.findById(purchaseId);
            const userdata = await User.findById(purchaseData.userId);
            const courseData = await Course.findById(purchaseData.courseId);
            courseData.studentsEnrolled.push(userdata)
            await courseData.save();
            userdata.enrolledCourses.push(courseData._id);
            await userdata.save();
            purchaseData.isPaid = "completed";
            await purchaseData.save();
            break;
        case 'payment_intent.payment_failed':
              {const paymentIntent = event.data.object;
            const paymentId = paymentIntent.id;
            const session = await stripe.checkout.sessions.list({
                payment_intent: paymentId,
            })
            const purchaseId = session.data[0].metadata.purchaseId;
        
        
            const purchaseData = await Purchase.findById(purchaseId);
            purchaseData.isPaid = "failed";
            await purchaseData.save();
        }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.json({received: true});

}