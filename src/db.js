import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://microservicios128:OkWuFboSMekQRMSp@microserviciosdb.gbwyz.mongodb.net/?retryWrites=true&w=majority&appName=MicroServiciosDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database is connected");
    } catch (error) {
        console.log("Database connection error:", error);
    }
};
