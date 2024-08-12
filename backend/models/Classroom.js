import mongoose from 'mongoose';

const timeSchema = new mongoose.Schema({
    start: {
        type: String,
    },
    end: {
        type: String,
    }
});
const classroomSchema = new mongoose.Schema({
    className:{
        type:String,
    },
    assignTeacher:{
        type:String,
    },
    tt: {
        Monday: timeSchema,
        Tuesday: timeSchema,
        Wednesday: timeSchema,
        Thursday: timeSchema,
        Friday: timeSchema,
        Saturday: timeSchema,
    }
})
const Classroom = mongoose.model('Classroom',classroomSchema);
export default Classroom;