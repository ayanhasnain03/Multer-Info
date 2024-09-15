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
exports.connectToDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Function to connect to MongoDB
const connectToDB = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(uri);
        console.log("Successfully connected to the database");
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
        throw error; // Optionally rethrow the error for higher-level handling
    }
});
exports.connectToDB = connectToDB;
// Define the schema for the User model
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    avatar: { type: String, required: false },
});
// Create and export the User model
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
