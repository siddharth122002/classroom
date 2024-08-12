import mongoose from 'mongoose';
const studentSchema = new mongoose.Schema({
    email:{
        type:String,
    },
    password:{
        type:String
    },
    username:{
        type:String,
    },
    myCC: {
        type:String,
    }, 
})
const Student = mongoose.model('Student',studentSchema);
export default Student;