import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Recipe = sequelize.define("recipe", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    category: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "Categories", // table name
            key: "id",
        },
    },

    area: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "Areas", // table name
            key: "id",
        },
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

// Recipe.sync({ alter: true });

export default Recipe;
