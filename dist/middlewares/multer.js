"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid"); //for unique identification
// Configure multer for file storage
const storage = multer_1.default.diskStorage({
    // Define the destination folder for uploaded files
    destination(req, file, callback) {
        callback(null, "uploads");
    },
    //define the fileName
    filename(req, file, callback) {
        const id = (0, uuid_1.v4)(); // Generate a unique ID for each file using UUID v4
        const extName = file.originalname.split(".").pop();
        callback(null, `${id}.${extName}`);
    },
});
exports.singleUpload = (0, multer_1.default)({ storage }).single("image");
