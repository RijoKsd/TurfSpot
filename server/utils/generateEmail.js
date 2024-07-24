import nodemailer from "nodemailer";
import chalk from "chalk";

export default async function generateEmail(to, subject, html) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      html: html,
    };
    await transporter.sendMail(mailOptions);
  } catch (e) {
    console.log(chalk.redBright.bold("Error in generateEmail"), e);
  }
}
