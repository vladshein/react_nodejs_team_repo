import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Recipe = sequelize.define("recipe", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    instructions: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    thumb: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

    time: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    category: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "categories", // table name
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },

    area: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "areas", // table name
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },

    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
});

Recipe.sync({ alter: true });

export default Recipe;
