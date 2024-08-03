import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
    turf:{ type:mongoose.Schema.Types.ObjectId, ref:'Turf'},
    startTime: {type:Date, required:true},
    endTime: {type:Date, required:true},
    // isBooked: {type:Boolean, default:false},
}, { timestamps: true });

export default mongoose.model("TimeSlot", timeSlotSchema);