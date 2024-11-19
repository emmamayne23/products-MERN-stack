import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1) // Exit process 1 means with failure and 0 means success
    }
}