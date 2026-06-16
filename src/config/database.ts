import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://muthu050:t2RRZICnusHjuayK@namasterdev.ys2cf7s.mongodb.net/smart_focus_tution_center_V2");
}

export default connectDB;