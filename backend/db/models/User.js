import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import { emailRegExp } from "../../constants/authConstants.js";

const User = sequelize.define("user", {
    id: {
        type: DataTypes.TEXT,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "Email in use",
        },
        validate: {
            is: emailRegExp,
        },
    },
    password: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
    },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
    },
});

export default User;
