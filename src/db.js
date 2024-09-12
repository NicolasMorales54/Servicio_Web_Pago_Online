import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://mongo:27017/test", {
        });
        console.log("Database is connected");
    } catch (error) {
        console.log("Database connection error:", error);
    }
};
