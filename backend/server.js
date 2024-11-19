import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import cors from "cors"

import path from "path"

import productRoutes from "./routes/product.route.js"


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.use(express.json()) // This middleware is used to parse the incoming request body as JSON.

app.use(cors())

app.use("/products", productRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

// console.log(process.env.MONGO_URI)

app.listen(PORT, () => {
    connectDB()
    console.log("Server is running on port: " + PORT)
})
