import mongoose from "mongoose";

const ownerRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email:{type:String, required: true, unique: true},
    phone:{type:String, required: true},
    status:{type:String, enum: ["pending", "approved", "rejected"], default: "pending"},
}, { timestamps: true });

export default mongoose.model("OwnerRequest", ownerRequestSchema);