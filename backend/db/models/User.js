import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import { emailRegExp } from "../../constants/authConstants.js";

const User = sequelize.define("user", {
    // id: {
    //     type: DataTypes.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true,
    // },
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
        allowNull: false,
    },

    // followers: {
    //     type: DataTypes.ARRAY(DataTypes.STRING),
    //     defaultValue: null,
    //     allowNull: true,
    // },
    // following: {
    //     type: DataTypes.ARRAY(DataTypes.STRING),
    //     defaultValue: null,
    //     allowNull: true,
    // },

    // createdRecipes: {
    //     type: DataTypes.INTEGER,
    //     defaultValue: null,
    //     allowNull: true,
    // },

    // favorites: {
    //     type: DataTypes.ARRAY(DataTypes.STRING),
    //     defaultValue: null,
    //     allowNull: true,
    // },

    // favoritesAmount: {
    //     type: DataTypes.INTEGER,
    //     defaultValue: null,
    //     allowNull: true,
    // },
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

User.sync({ force: true });

export default User;
