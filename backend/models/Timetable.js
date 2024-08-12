import mongoose from 'mongoose';
const timetableSchema = new mongoose.Schema({
    teacherEmail:{
      type:String,
    },
    timeline: [{
      start:{
        type:String,
      },
      end:{
        type:String,
      }
    }],
    subs: [{
      periods:{
        type:[],
      }
    }],
  });
const Timetable = mongoose.model('Timetable',timetableSchema);
export default Timetable;