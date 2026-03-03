import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    publicKey: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    encryptedPrivateKey: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("active", "disabled"),
      defaultValue: "active",
    },

    lastLoginAt: {
      type: DataTypes.DATE,
    },
  },
  { timestamps: true }
);

export default User;