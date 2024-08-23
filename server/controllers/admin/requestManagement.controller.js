import chalk from "chalk";
import OwnerRequest from "../../models/ownerRequest.model.js";
import generateEmail from "../../utils/generateEmail.js";

//  get all requested owners
export const getAllRequestedOwners = async (req, res) => {
  const admin = req.admin.role;
  if (admin !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access denied" });
  }
  try {
    const ownerRequests = await OwnerRequest.find({ status: "pending" });
    const ownerRejectedRequests = await OwnerRequest.find({
      status: "rejected",
    });
    res.status(200).json({
      success: true,
      message: "success",
      ownerRequests,
      ownerRejectedRequests,
    });
  } catch (err) {
    console.log(chalk.red("Error in getAllRequestedOwners: ", err));
  }
};

// approve the pending owner request by id
export const approveOwnerRequest = async (req, res) => {
  const admin = req.admin.role;
  const { id } = req.params;
  if (admin !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access denied" });
  }
  try {
    const ownerRequest = await OwnerRequest.findById(id);
    if (!ownerRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Owner request not found" });
    }
    ownerRequest.status = "approved";
    await ownerRequest.save();
    const to = ownerRequest.email;
    const subject = "Your request has been approved";
    const html = ` 
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #4CAF50;">Your request to become an owner has been approved</h1>
        <p>Congratulations! You can now create your account by clicking the button below:</p>
        <button style="background-color: #4CAF50; border: none; padding: 10px 20px; text-align: center; display: inline-block; margin: 10px 0; cursor: pointer; border-radius: 5px;">
            <a href="${process.env.OWNER_URL}" style="color: white; text-decoration: none; font-size: 16px;">Create your account</a>
        </button>
    </div>
`;
    await generateEmail(to, subject, html);
    return res
      .status(200)
      .json({ success: true, message: "Owner request approved" });
  } catch (err) {
    console.log(chalk.red("Error in approveOwnerRequest: ", err));
    return res.status(500).json({ message: "error", data: err });
  }
};

// reject the pending owner request
export const deleteOwnerRequest = async (req, res) => {
  const admin = req.admin.role;
  const { id } = req.params;
  if (admin !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access denied" });
  }
  try {
    const ownerRequest = await OwnerRequest.findById(id);
    if (!ownerRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Owner request not found" });
    }
    ownerRequest.status = "rejected";
    await ownerRequest.save();
    const to = ownerRequest.email;
    const subject = "Your request has been rejected";
    const html = ` 
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #4CAF50;">Your request to become an owner has been rejected</h1>
        <p>We apologize for the inconvenience. Please contact us if you have any further questions.</p>
        <p>Thank you for your understanding.</p>
    </div>
`;
    await generateEmail(to, subject, html);
    return res
      .status(200)
      .json({ success: true, message: "Owner request rejected" });
  } catch (eer) {
    console.log("Error in deleteOwnerRequest: ", eer);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// reconsider the rejected owner request
export const reconsiderOwnerRequest = async (req, res) =>{
  const admin = req.admin.role;
  const { id } = req.params;
  if (admin !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access denied" });
  }
  try{
    const ownerRequest  = await OwnerRequest.findById(id);
    if (!ownerRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Owner request not found" });
    }
    ownerRequest.status = "pending";
    await ownerRequest.save();
    const to = ownerRequest.email;
    const subject = "Your request has been reconsidered";
    const html = ` 
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #4CAF50;">Your request to become an owner has been reconsidered</h1>
        <p>We apologize for the inconvenience. Please contact us if you have any further questions.</p>
        <p>Thank you for your understanding.</p>
    </div>
`;
    await generateEmail(to, subject, html);
    return res
      .status(200)
      .json({ success: true, message: "Owner request reconsidered" });
  }catch(err){
    console.log(chalk.red("Error in reconsiderOwnerRequest: ", err));
    return res.status(500).json({ message: "Internal server error" });
  }
}