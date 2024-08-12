import express from 'express';
import cors from 'cors';
import Teacher from './models/Teacher.js';
import Student from './models/Student.js';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import Classroom from './models/Classroom.js';
import Timetable from './models/Timetable.js';
dotenv.config({
    path: './.env'
});
const app = express();

app.use(cors());
app.use(express.json())

const fn=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("db connected successfully")
    }catch(err){
        console.log("ERRORR:",err);
    }
}
fn();




app.post('/login',async (req, res) => {
    const {email,password,role} =req.body;
    if(role==="principal"){
        if(email==="principal@classroom.com" && password==="Admin"){
            return res.send({msg:"principal",status:200})
        }
    }else if(role ==="teacher"){
        const teacher = await Teacher.findOne({
            email,
        })
        if(!teacher || password!=teacher.password){
            return res.send({msg:"email or password incorrect",status:404})
        }
        return res.send({msg:"teacher",teacher,status:200})
    }else if(role==="student"){
        const student = await Student.findOne({
            email,
        })
        if(!student || password!=student.password){
            return res.send({msg:"email or password incorrect",status:404})
        }
        return res.send({msg:"student",student,status:200})
    }
    return res.send({msg:"no user found",status:404});
});

//createteacher
app.post('/createTeacher',async (req, res) => {
    const {teacherEmail,teacherPassword,teacherUsername} =req.body;
    
    const exist = await Teacher.findOne({email:teacherEmail});
    if(exist){
        return res.send({msg:"account exists",status:404})
    }
    const teacher = await Teacher.create({
        email:teacherEmail,
        password:teacherPassword,
        username:teacherUsername,
    })
    await teacher.save()
    return res.send({msg:"teacher created",status:200});
});
//getallteachers
app.get('/getTeachers',async (req, res) => {
    const allTeachers = await Teacher.find();
    return res.send({msg:"allteachers",allTeachers,status:200});
});

//createstudent
app.post('/createStudent',async (req, res) => {
    const {studentEmail,studentPassword,studentUsername,studentAssignedTo} =req.body;
    const exist = await Student.findOne({email:studentEmail});
    if(exist){
        return res.send({msg:"account exists",status:404})
    }
    const student = await Student.create({
        email:studentEmail,
        password:studentPassword,
        username:studentUsername,
        myCC:studentAssignedTo,
    })
    await student.save()
    return res.send({msg:"student created",status:200});
});

//createclassroom
app.post('/createClassroom',async (req, res) => {
    const {className,assignTeacher,tt}=req.body;
    const classroom = await Classroom.findOne({
        assignTeacher
    })
    if(classroom){
        return res.send({msg:"already assigned",status:404})
    }
    const newClassroom = await Classroom.create({
        className,
        assignTeacher,
        tt,
    })
    const teacher =await Teacher.findOne({email:assignTeacher});
    teacher.assignedToClass=newClassroom;
    await teacher.save();
    await newClassroom.save();
    return res.send({msg:"class created",status:200});
});
//getClassrooms
app.get('/getClasses',async (req, res) => {
    const allClass = await Classroom.find();
    return res.send({msg:"classes",allClass,status:200});
});
//getClass
app.get('/getClass',async (req, res) => {
    const email = req.headers['email'];
    const allStudent = await Student.find({
        myCC:email,
    });
    // console.log(allStudent);
    return res.send({msg:"classes",allStudent,status:200});
});
app.get('/getClassstudent',async (req, res) => {
    const email = req.headers['email'];
    const student = await Student.findOne({
        email,
    })
    const allStudent = await Student.find({
        myCC:student.myCC,
    });
    // console.log(allStudent);
    return res.send({msg:"classes",allStudent,status:200});
});
//createTT
app.post('/createTT',async (req, res) => {
    const email = req.headers['email'];
    const exist=await Timetable.findOne({
        teacherEmail:email,
    })
    if(exist){
        return res.send({msg:"already exists request developer to add edit function",status:404})
    }
    const {timeline,subs}=req.body;
    const newTT = await Timetable.create({
        teacherEmail:email,
        timeline,
        subs,
    }) 
    await newTT.save();
    return res.send({msg:"TT",status:200});
});
app.get('/getTT',async (req, res) => {
    const email = req.headers['email'];
    const currStudent = await Student.findOne({
        email,
    })
    const TT = await Timetable.findOne({
        teacherEmail:currStudent.myCC,
    })
    // console.log(TT)
    return res.send({msg:"timetable send",TT,status:200});
});
app.get('/getTTteacher',async (req, res) => {
    const email = req.headers['email'];
    const TT = await Timetable.findOne({
        teacherEmail:email,
    })
    // console.log(TT)
    return res.send({msg:"timetable send",TT,status:200});
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
