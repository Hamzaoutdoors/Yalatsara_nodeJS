import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {
    authRoute,
    agencesRoute,
    tripsRoute,
    usersRoute
} from "./routes/index.js";

const app = express();
dotenv.config();

const start = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO);
        app.listen(port, () => {
            console.log(`Server listening to port ${port}`)
        })
    } catch (error) {
        throw error
    }
}

//middlewares

app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/agences", agencesRoute);
app.use("/api/trips", tripsRoute);

const port = process.env.PORT || 3000;

start();
