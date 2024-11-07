import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

export const connectToDB = async () => {
    // Enable strict mode for query
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        // Use MONGODB_URI from environment variables
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
        });

        isConnected = true;
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to MongoDB");
    }
};
