import express from 'express';
import cors from 'cors';
import "dotenv/config" 
import  { connectMongoDatabase } from './config/db.js';
import { handleWebhook, stripeWebhook } from './controllers/webhooks.js';
import mentorRouter from './routes/mentorRoutes.js';
import {clerkMiddleware} from '@clerk/express';
import connectCloudinary from './config/cloudinary.js';
import courseRouter from './routes/courseRoute.js';
import userRouter from './routes/userRoute.js';

const app = express();


connectMongoDatabase();
await connectCloudinary();
app.use(cors());
app.use(clerkMiddleware());

app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.post('/webhook',express.json(), handleWebhook)
app.use("/api/mentor" , express.json(), mentorRouter )
app.use("/api/courses" , express.json() , courseRouter)
app.use("/api/user" , express.json() , userRouter)
app.post("/stripe", express.raw({type: "application/json"}), stripeWebhook)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});