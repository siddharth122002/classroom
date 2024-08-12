import mongoose from 'mongoose';
const teacherSchema = new mongoose.Schema({
    email:{
        type:String,
    },
    password:{
        type:String
    },
    username:{
        type:String,
    },
    assignedToClass: {
        type:mongoose.Types.ObjectId,
        ref:'Classroom',
    }, 
    timetable: [{
        type:mongoose.Types.ObjectId,
        ref:'Timetable',
    }], 
})
const Teacher = mongoose.model('Teacher',teacherSchema);
export default Teacher;