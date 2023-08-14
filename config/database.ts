import mongoose from "mongoose";
const MONGO_URL = "mongodb://localhost:27017/fbae_app";

const connection = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connected, DB=" + MONGO_URL);
  } catch (err) {
    console.log("Something went wrong!", err);
  }
};

export default connection;
