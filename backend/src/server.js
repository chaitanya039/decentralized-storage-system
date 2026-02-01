import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import pool from "./config/db.js";

// Database connection
(
    async () => {
        try {
            const result = await pool.query("SELECT version()");
            console.log(result.rows[0]);
        } catch(error) {
            console.log("DB Connection Error: ", error.message);
        }
    }
)();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});