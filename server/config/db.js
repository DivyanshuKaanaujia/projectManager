import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.error("Error in connecting to DB: ", error);
    process.exit(1); 
  }

  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from the database");
  });
};

export default connectDB;
