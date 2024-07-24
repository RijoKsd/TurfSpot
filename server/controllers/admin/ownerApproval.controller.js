import chalk from "chalk";
import OwnerRequest from "../../models/ownerRequest.model.js";
import generateEmail from "../../utils/generateEmail.js";

//  get all requested owners
export const getAllRequestedOwners = async (req, res) => {
  try {
    const ownerRequests = await OwnerRequest.find({ status: "pending" });
    res.status(200).json({ success: true, message: "success", ownerRequests });
  } catch (err) {
    console.log(chalk.red("Error in getAllRequestedOwners: ", err));
  }
};

// approve the pending owner request by id
export const approveOwnerRequest = async (req, res) => {
  const { id } = req.params;
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
            <a href=${process.env.OWNER_URL} style="color: white; text-decoration: none; font-size: 16px;">Create your account</a>
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
export const rejectOwnerRequest = async (req, res) => {};

// get all approved owners
export const getAllApprovedOwners = async (req, res) => {};
