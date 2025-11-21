import mongoose from "mongoose";



const lectureSchema = new mongoose.Schema({
    lectureId:{type:String , required:true},
    lecturetitle: { type: String, required: true },
    lectureDuration: { type: String, required: true },
    lectureOrder: { type: Number, required: true },
}, { _id: false });

const chapterSchema = new mongoose.Schema({
    chapterId:{type:String , required:true},
    chapterOrder: { type: Number, required: true },
    chapterTitle: { type: String, required: true },
    chapterContent:[lectureSchema]
}, { _id: false });



const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    published: { type: Boolean, default: false },
    discount: { type: Number, required:true , min:0 , max:100 },
    content:[chapterSchema], 
    ratings:[
        {
            userId:{type:String },
            rating:{type:Number , min:1 , max:5}
        }
    ],
    instructor: { type: String, ref: "User", required: true },
    studentsEnrolled: [{ type: String, ref: "User" }],

}, { timestamps: true , minimize:false });


const Course = mongoose.model("Course", courseSchema);
export default Course;
