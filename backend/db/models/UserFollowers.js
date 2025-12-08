import sequelize from "../sequelize.js";

const UserFollowers = sequelize.define("userFollowers", {
    followerId: {
        primaryKey: true,
        references: {
            model: "Users",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    followingId: {
        primaryKey: true,
        references: {
            model: "Users",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
});

export default UserFollowers;
