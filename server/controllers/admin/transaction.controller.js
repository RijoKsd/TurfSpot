import Booking from "../../models/booking.model.js";

// get all transactions

export const getAllTransaction = async (req,res)=>{
    const admin = req.admin.role;
    if (admin !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access denied" });
    }
    try {
        const transactions = await Booking.find({},{createdAt:1,payment:1, totalPrice:1 }).populate("user", {name:1, _id:0}).populate("turf",{name:1,_id:0}).sort({createAt:-1});
        console.log(transactions, "transactions");
        return res.status(200).json({
            message: " Fetched all transactions",
            transactions,
        });
        
    } catch (error) {
        console.error("Error in getAllTransaction: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}