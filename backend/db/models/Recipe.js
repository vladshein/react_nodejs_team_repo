import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Recipe = sequelize.define("recipe", {
    id: {
        type: DataTypes.TEXT,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    instructions: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    thumb: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    time: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    categoryId: {
        type: DataTypes.TEXT,
        allowNull: true,
        references: {
            model: "categories",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
    areaId: {
        type: DataTypes.TEXT,
        allowNull: true,
        references: {
            model: "areas",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
    ownerId: {
        type: DataTypes.TEXT,
        allowNull: true,
        references: {
            model: "users",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
});

export default Recipe;
