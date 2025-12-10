import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Ingredient = sequelize.define(
    "ingredient",
    {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        desc: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        timestamps: false, // Sequelize will auto-manage createdAt/updatedAt
    }
);

export default Ingredient;
