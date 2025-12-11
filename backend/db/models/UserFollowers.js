import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const UserFollowers = sequelize.define(
  'userFollower',
  {
    id: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
    followerId: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    followingId: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['followerId', 'followingId'],
      },
    ],
    validate: {
      cannotFollowSelf() {
        if (this.followerId === this.followingId) {
          throw new Error('User cannot follow themselves');
        }
      },
    },
  }
);

export default UserFollowers;
