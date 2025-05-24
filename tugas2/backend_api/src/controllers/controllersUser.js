import { Op } from "sequelize";
import User from "../models/modelsUser.js";
import { 
    hashPassword, 
    comparePassword, 
    generateToken 
} from "../service/serviceAuth.js";
import { 
    errorResponse, 
    successResponse 
} from "../utils/utilsResponseHandler.js";
import jwt from "jsonwebtoken";

// POST
const registerUser = async(req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }]
            }
        });

        if(existingUser) {
            return errorResponse(res, "Username or email already exist", 400);
        }

        const hashedPassword = await hashPassword(password);
        const user = await User.create({ 
            username,
            email, 
            password: hashedPassword
        });

        successResponse(res, user, "User registered successfully", 201);
    } catch (error) {
        console.error("Registration error:", error);
        errorResponse(res, "User registration failed", 400);
    }
};

// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ 
//             where: { 
//                 email: email 
//             } 
//         });

//         if (!user || !(await comparePassword(password, user.password))) {
//             return errorResponse(res, "Invalid credentials", 401);
//         }

//         const token = generateToken(user);
//         successResponse(res, { token }, "Login successful");
//     } catch (error) {
//         errorResponse(res, "Login failed", 400);
//     }
// };

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ 
            where: { 
                email: email 
            } 
        });

        if (!user || !(await comparePassword(password, user.password))) {
            return errorResponse(res, "Invalid credentials", 401);
        }

        // const token = generateToken(user);

        const userPlain = user.toJSON();
        const { password: _, refresh_token: __, ...safeUserData } = userPlain;

        const accessToken = jwt.sign (
            safeUserData,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn : "20m"}
        );

        const refreshToken = jwt.sign(
            safeUserData,
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        await User.update(
            { refresh_token: refreshToken },
            { where: {id: user.id} }
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "Strict",
            secure: false,
            maxAge: 24*60*60*1000, // 1 hari
        });

        // successResponse(res, { token }, "Login successful");

        return successResponse(
            res,
            { accessToken, user: safeUserData },
            "Login berhasil"
        );
    } catch (error) {
        errorResponse(res, "Login failed", 400);
    }
};

export {
    registerUser,
    loginUser
};