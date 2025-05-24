import dotenv from "dotenv";
// Memastikan .env terbaca sebelum file lain menggunakannya
dotenv.config();

import express from "express";
import cors from "cors";
import routesUser from "./src/routes/routesUser.js";
import routesNote from "./src/routes/routesNotes.js";
import cookieParser from "cookie-parser";


const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// console.log("JWT_SECRET:", process.env.JWT_SECRET);


app.use(routesUser);
app.use(routesNote);

app.listen(5000, () => console.log("Server connected successfully"));
