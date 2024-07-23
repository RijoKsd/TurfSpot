import * as argon2 from "argon2";
import chalk from "chalk";
import { generateOwnerToken } from "../../utils/generateJwtToken.js";
import Owner from "../../models/owner.model.js";

export const registerOwner = async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword || !phone) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Passwords do not match" });
  }
  try {
    const owner = await Owner.findOne({ email });
    if (owner) {
      return res
        .status(400)
        .json({ success: false, message: "Owner already exists" });
    }
    const hashedPassword = await argon2.hash(password);

    const newOwner = new Owner({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    await newOwner.save();
    const token = generateOwnerToken(newOwner);
    return res
      .status(201)
      .json({ success: true, message: "Owner created successfully", token });
  } catch (err) {
    console.log(chalk.red(err.message));
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const loginOwner = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }
  try {
    const owner = await Owner.findOne({ email });
    if (!owner) {
      return res
        .status(400)
        .json({ success: false, message: "Owner does not exist" });
    }
    const isPasswordCorrect = await argon2.verify(owner.password, password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }
    const token = generateOwnerToken(owner);
    return res
      .status(200)
      .json({ success: true, message: "Login successful", token });
  } catch (err) {
    console.log(chalk.red(err.message));
    return res.status(400).json({ success: false, message: err.message });
  }
};
