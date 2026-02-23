import { DataTypes } from "sequelize";
import sequelize from "../config/db";

// Create database schema for User
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
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      field: "password_hash",
      allowNull: false,
    },
    publicKey: {
      type: DataTypes.STRING,
      field: "public_key",
      allowNull: false,
    },
    encryptedPrivateKey: {
      type: DataTypes.STRING,
      field: "encrypted_private_key",
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "active", "suspended", "deleted"),
      allowNull: false,
      defaultValue: "pending",
    },
    storageQuota: {
      type: DataTypes.BIGINT,
      defaultValue: 1073741824, // 1GB
      field: "storage_quota",
    },

    usedStorage: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      field: "used_storage",
    },

    lastLoginAt: {
      type: DataTypes.DATE,
      field: "last_login_at",
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);


export default User;