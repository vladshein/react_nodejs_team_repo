import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Testimonial = sequelize.define("testimonial", {
    testimonial: {
        type: DataTypes.STRING,
        allowNull: false,
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

// Testimonial.sync({ alter: true });

export default Testimonial;
