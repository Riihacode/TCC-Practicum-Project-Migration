import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/utilsResponseHandler.js";

// Udah diganti make implementasi ACCESS_TOKEN_SECRET dan REFRES_TOKEN_SECRET di controllersUser.js dan verifyToken.js
const verifyAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return errorResponse(res, "Access denied. No token provided", 403);
        }

        // Ambil token setelah bearer
        const token = authHeader.split(" ")[1];

        //jwt.verify(token, process.env.JWT_SECRET || "secretKey", (err, decoded) => {
        jwt.verify(token, process.env.JWT_SECRET || "defaultSecretKey", (err, decoded) => {
            if (err) return errorResponse(res, "Invalid token", 401);
            
            // Simpan informasi user dari token ke req.user
            req.user = decoded;
            next();
        });
    } catch(error) {
        return errorResponse(res, "Access denied", 403);
    }  
};

export default verifyAuth;