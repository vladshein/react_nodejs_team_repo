import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const UserFollowers = sequelize.define(
    "userFollower",
    {
        followerId: {
            type: DataTypes.TEXT,
            primaryKey: true,
            references: {
                model: "users",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        followingId: {
            type: DataTypes.TEXT,
            primaryKey: true,
            references: {
                model: "users",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
    },
    {
        timestamps: true,
        validate: {
            cannotFollowSelf() {
                if (this.followerId === this.followingId) {
                    throw new Error("User cannot follow themselves");
                }
            },
        },
    }
);

export default UserFollowers;
