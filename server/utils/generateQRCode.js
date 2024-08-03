import QRCode from "qrcode";
import cloudinary from "./cloudinary.js"

async function generateQRCode(
  price,
  startTime,
  endTime,
  date,
  turfName,
  location
) {
  try {
    // Create the content string
    const content = `Turf Name: ${turfName}\nLocation: ${location}\nPrice: ${price}\nDate: ${date}\nStart Time: ${startTime}\nEnd Time: ${endTime}`;

    // Generate QR code as a data URL
    const qrCodeDataURL = await QRCode.toDataURL(content);

    // Upload the QR code to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(qrCodeDataURL, {
      folder: "TurfSpot/qrcode"
    });

    console.log("QR code has been generated and uploaded successfully!");
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Error generating or uploading QR code:", error);
    throw error;
  }
}

export default generateQRCode;
