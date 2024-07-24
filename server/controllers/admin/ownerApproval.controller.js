import chalk from "chalk"
import OwnerRequest from "../../models/ownerRequest.model.js";

//  get all requested owners
export const getAllRequestedOwners = async(req,res) =>{
    try{
        const ownerRequests = await OwnerRequest.find({status: "pending"})
        res.status(200).json({ success: true, message: "success",  ownerRequests })
    }catch(err){
        console.log(chalk.red("Error in getAllRequestedOwners: ",err))
    }
}

// approve the pending owner request by id
export const approveOwnerRequest = async(req,res) =>{
    const {id} = req.params;
    try{
        const ownerRequest = await OwnerRequest.findById(id)
        if(!ownerRequest){
            return res.status(404).json({success: false, message: "Owner request not found"})
        }
        ownerRequest.status = "approved";
        await ownerRequest.save();
        return res.status(200).json({success: true, message: "Owner request approved"})
    }catch(err){
        console.log(chalk.red("Error in approveOwnerRequest: ",err))
        return res.status(500).json({message: "error", data: err})
    }

}

// reject the pending owner request
export const rejectOwnerRequest = async(req,res) =>{}

// get all approved owners
export const getAllApprovedOwners = async(req,res) =>{}