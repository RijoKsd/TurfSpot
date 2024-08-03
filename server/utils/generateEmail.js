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

export const generateHTMLContent = (turfName, location,date,startTime,endTime,totalPrice, QRcode) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            text-align: center;
            padding: 20px;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 0 0 5px 5px;
        }
        h1 {
            margin: 0;
        }
        .info {
            margin-bottom: 15px;
        }
        .info strong {
            font-weight: bold;
            color: #4CAF50;
        }
        .qr-code {
            text-align: center;
            margin: 20px 0;
        }
        .qr-code img {
            max-width: 200px;
            height: auto;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Booking Confirmation</h1>
    </div>
    <div class="content">
        <p>Your booking has been successful.</p>
        <div class="info">
            <p><strong>Turf Name:</strong> ${turfName}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Start Time:</strong> ${startTime}</p>
            <p><strong>End Time:</strong> ${endTime}</p>
            <p><strong>Total Price:</strong> ${totalPrice}</p>
        </div>
        <div class="qr-code">
            <img src="${QRcode}" alt="QR Code">
        </div>
        <p>Thank you for using our service.</p>
        <p>Best Regards,<br>The Team</p>
    </div>
    <div class="footer">
        <p>This is an automated email. Please do not reply.</p>
    </div>
</body>
</html>
`;
};
