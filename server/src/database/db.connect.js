import mongoose from "mongoose";
import DBName from "../temp.js";

async function connectDB(){
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DBName}`)
        console.log(`DB host :: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error(`MongoDB connection failed :: ${error?.message}`)
        process.exit(1)
    }
}

export default connectDB