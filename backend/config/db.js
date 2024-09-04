import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        let conn = await mongoose.connect(process.env.MONGODB_URL || 8000);
        console.log(`Connected to mongodb at ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to mongodb: ${error.message}`);
        process.exit(1);
    }
}