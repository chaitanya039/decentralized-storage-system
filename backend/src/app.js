import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Creating App
const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// Default route
app.get("/", (req, res) => {
    return res.status(200).json({
        messsage: "Decentralized Storage API is running  🚀"
    });
});


// 404 Route Handler
app.use((req, res) => {
    return res.status(404).json({
        message: "Route not found ♦️"
    });
});


export default app;