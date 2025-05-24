import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
    // "tcc_practicum_task2",
    // // "prak-tcc-task3-123210038",
    // "root",
    // "",{
        
        // host: "localhost",
        // password: "",
        // dialect: "mysql",
        
        // host: "104.154.27.60",
        // password: "testing_prak-tcc-task3-123210038",
        // dialect: "mysql",
        // logging: console.log,
    // }

    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        dialect: "mysql",
    }

);

const connectDB = async () => {
    try {
        await db.authenticate();
        console.log("Database connected successfully");
    } catch(error) {
        console.log("Database connection failed: ", error);
    }
};

export {
    db, 
    connectDB
};