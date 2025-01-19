import mongoose from "mongoose";

const connectMongoDB = async () => {
    const MONGODB_URI = "mongodb+srv://admin:LuHG4JksgMZZUUmL@next-app.prumw.mongodb.net/?retryWrites=true&w=majority&appName=next-app"
  try {
    console.log("Connecting to MongoDB", process.env.MONGODB_URI);
    await mongoose.connect(MONGODB_URI || "");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
  }
}

export default connectMongoDB;