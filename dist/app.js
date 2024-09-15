"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const userSchema_js_1 = require("./models/userSchema.js");
const userSchema_js_2 = __importDefault(require("./models/userSchema.js"));
const mongoose_1 = __importDefault(require("mongoose"));
const multer_js_1 = require("./middlewares/multer.js");
const port = 3000;
const app = (0, express_1.default)();
const URI = "mongodb://localhost:27017/multer"; // Ensure your DB name is correct
// Connect to the database
(0, userSchema_js_1.connectToDB)(URI);
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static("uploads"));
app.post("/register", multer_js_1.singleUpload, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const avatar = req.file ? req.file.filename : null;
        // Check for missing fields
        if (!username || !avatar) {
            return res.status(400).json({
                message: "Please enter all required fields (username and avatar).",
            });
        }
        // Check if the user already exists
        const userExist = yield userSchema_js_2.default.findOne({ username });
        if (userExist) {
            return res.status(400).json({
                message: "User already exists.",
            });
        }
        // Create a new user
        yield userSchema_js_2.default.create({
            username,
            avatar,
        });
        res.status(201).json({
            message: "User created successfully.",
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            message: "Internal server error.",
        });
    }
}));
app.delete("/remove/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Validate the ObjectId format
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid User ID format.",
        });
    }
    try {
        const user = yield userSchema_js_2.default.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }
        // Delete the avatar image if it exists
        if (user.avatar) {
            const avatarPath = path_1.default.join(process.cwd(), "uploads", user.avatar);
            (0, fs_1.rm)(avatarPath, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                    return res.status(500).json({
                        message: "Error deleting user avatar.",
                    });
                }
                console.log("User avatar deleted.");
            });
        }
        // Delete the user from the database
        yield userSchema_js_2.default.findByIdAndDelete(id);
        res.json({
            message: "User deleted successfully.",
        });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            message: "Internal server error.",
        });
    }
}));
app.put("/profile/:id", multer_js_1.singleUpload, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { username } = req.body;
    const avatar = req.file ? req.file.filename : null;
    const user = yield userSchema_js_2.default.findById(id);
    if (!user)
        return res.status(404).json({
            message: "user not found",
        });
    if (username)
        user.username = username;
    if (avatar) {
        const removeOldAvatar = path_1.default.join(process.cwd(), "uploads", user.avatar);
        (0, fs_1.rm)(removeOldAvatar, (err) => {
            if (err)
                return res.status(500).json({
                    message: "Image not delete for update",
                });
            console.log("image delete");
        });
        user.avatar = avatar;
    }
    yield user.save();
    res.status(200).json({
        message: "user updated",
    });
}));
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
