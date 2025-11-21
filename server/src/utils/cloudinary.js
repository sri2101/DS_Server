// import {v2 as cloudinary} from "cloudinary"
// import fs from "fs"
// import dotenv from "dotenv"

// dotenv.config()

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null;

//         const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "image" })
//         fs.unlinkSync(localFilePath)
//         return response?.secure_url
//     } catch (error) {
//         fs.unlinkSync(localFilePath)
//         console.error(error?.message)
//     }
// }

// export default uploadOnCloudinary


import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload from memory buffer
const uploadOnCloudinary = async (fileBuffer, filename) => {
  try {
    return await cloudinary.uploader.upload_stream(
      { resource_type: "image", public_id: filename },
      (err, result) => {
        if (err) throw err;
        return result;
      }
    );
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export default uploadOnCloudinary;
