import multer from "multer";
import { v4 as uuid } from "uuid"; //for unique identification
// Configure multer for file storage
const storage = multer.diskStorage({
  // Define the destination folder for uploaded files
  destination(req, file, callback) {
    callback(null, "uploads");
  },
  //define the fileName
  filename(req, file, callback) {
    const id = uuid(); // Generate a unique ID for each file using UUID v4
    const extName = file.originalname.split(".").pop();
    callback(null, `${id}.${extName}`);
  },
});

export const singleUpload = multer({ storage }).single("image");
