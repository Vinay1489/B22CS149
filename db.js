import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
try
{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection Successful");
}
catch(err)
{
    console.error("Error in connecting to db",err.message);
    process.exit(1);
}    
}