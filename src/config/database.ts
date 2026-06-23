import mongoose from "mongoose";
import { MONGO_DB_URL } from "../utils/constant.js";

const connectDB = async () => {
    await mongoose.connect(MONGO_DB_URL);
}

export default connectDB;