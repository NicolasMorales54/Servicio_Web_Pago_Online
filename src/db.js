import mongoose from "mongoose";

export const connectDB =  async () => {
    try{
        await mongoose.connect("mongodb+srv://microservicios485:ieDQvV0q8ZLhQIx1@basededatosgatitos.zwlc5.mongodb.net/?retryWrites=true&w=majority&appName=BaseDeDatosGatitos");
        console.log("Database is connect");
    } catch(error){  
        console.log("Database Error"); 
    }  
}