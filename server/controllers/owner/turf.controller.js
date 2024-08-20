import { validationResult } from "express-validator";
import cloudinary from "../../utils/cloudinary.js";
import Turf from "../../models/turf.model.js";
import chalk from "chalk";

export const turfRegister = async (req, res) => {
  const image = req.file.path;
  const owner = req.owner.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }
  try {
    // upload the turf image to cloudinary
    const turfImage = await cloudinary.uploader.upload(image, {
      folder: "TurfSpot/turfs",
    });
    const turf = new Turf({
      image: turfImage.secure_url,
      owner,
      ...req.body,
    });
    await turf.save();
    return res
      .status(201)
      .json({ success: true, message: "Turf created successfully" });
  } catch (err) {
    console.log(chalk.red(err.message));
    return res.status(500).json({ success: false, message: err.message });
  }
};

// get all turfs by owner id

export const getTurfByOwner = async (req, res) => {
  const ownerId  = req.owner.id;

  try{
    const turfs = await Turf.find({owner: ownerId});
    return res.status(200).json(turfs);
  }catch(err){
    console.error("Error getting turfs by ownerId", err);
    return res.status(500).json({success: false, message: err.message});
  }
   
 };
