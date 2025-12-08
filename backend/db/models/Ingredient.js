import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Ingredient = sequelize.define("ingredient", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
});

export default Ingredient;
