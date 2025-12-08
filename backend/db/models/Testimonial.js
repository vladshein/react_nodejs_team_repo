import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Testimonial = sequelize.define("testimonial", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    testimonial: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    ownerId: {
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

export default Testimonial;