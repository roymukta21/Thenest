import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  // If already connected, return
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  // Check if MONGO_URI exists
  if (!process.env.MONGO_URI) {
    const error = new Error("MONGO_URI is not defined in .env.local");
    console.error("❌", error.message);
    throw error;
  }

  try {
    // Set mongoose options
    mongoose.set('strictQuery', false);
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    
    isConnected = true;
    console.log("✅ MongoDB connected successfully");
    console.log("📊 Database:", mongoose.connection.name);
  } catch (error) {
    isConnected = false;
    console.error("❌ MongoDB connection error:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    
    // Provide helpful error messages
    if (error.message.includes("bad auth") || error.message.includes("Authentication failed")) {
      console.error("\n🔑 Authentication Error - Please check:");
      console.error("1. Username and password are correct in MongoDB Atlas");
      console.error("2. Database user exists in 'Database Access'");
      console.error("3. User has proper permissions (Read and write to any database)");
      console.error("4. Special characters in password are URL encoded");
    } else if (error.message.includes("ENOTFOUND") || error.message.includes("getaddrinfo")) {
      console.error("\n🌐 Network Error - Please check:");
      console.error("1. Your internet connection");
      console.error("2. MongoDB cluster URL is correct");
      console.error("3. Cluster is running in MongoDB Atlas");
    } else if (error.message.includes("IP") || error.message.includes("not allowed")) {
      console.error("\n🔒 IP Whitelist Error - Please check:");
      console.error("1. Your IP is whitelisted in MongoDB Atlas 'Network Access'");
      console.error("2. Or add 0.0.0.0/0 to allow all IPs (for development)");
    }
    
    throw error;
  }
};

export default connectDB;
