import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config(); 


const mongoURI = process.env.MONGODB_URL;
console.log(mongoURI);


const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo successfully");
  } catch (error) {
    console.error("Error connecting to Mongo:", error);
  }
};

export default connectToMongo;
