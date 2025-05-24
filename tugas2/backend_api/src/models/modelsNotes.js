import { DataTypes } from "sequelize";
import { db } from "../config/configDatabase.js";
import User from "./modelsUser.js";

const Note = db.define(
    "Note", {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        user_id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
    }, {
        tableName: "notes", 
        timestamps: false,
    }
);

Note.belongsTo(
    User, {
    foreignKey: "user_id"
});

export default Note;