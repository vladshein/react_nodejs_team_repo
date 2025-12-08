import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Ingredient = sequelize.define("ingredient", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
});

Ingredient.sync({ force: true });

export default Ingredient;
