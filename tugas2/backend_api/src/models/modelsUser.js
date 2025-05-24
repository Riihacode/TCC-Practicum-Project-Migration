import { Sequelize } from "sequelize";
import { db } from "../config/configDatabase.js";

const { DataTypes } = Sequelize;

const User = db.define(
    "users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        refresh_token: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: "users",
        timestamps: false,
    }
)

db.sync().then(() => console.log("Database Synchronized"));

export default User;