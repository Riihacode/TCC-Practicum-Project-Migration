import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

// Udah ga dipake krn diganti dengan implementasi ACCESS_TOKEN_SECRET dan REFRES_TOKEN_SECRET di controllersUser.js dan verifyToken.js
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || "defaultSecretKey",
        { expiresIn: "1h" }
    );
};

export { 
    hashPassword,
    comparePassword,
    generateToken 
};