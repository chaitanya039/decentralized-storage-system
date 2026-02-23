import sequelize from "./db.js";

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL Connected Successfully!");
        
        await sequelize.sync();
        console.log("Moded Synced!");
    } catch(error) {
        console.log("Database Connection Failed!", error);
        process.exit(1);
    }
};