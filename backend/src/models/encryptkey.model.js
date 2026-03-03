import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const EncryptedKey = sequelize.define(
  "EncryptedKey",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    fileId: DataTypes.UUID,
    userId: DataTypes.UUID,

    encryptedKey: DataTypes.TEXT,

    algorithm: {
      type: DataTypes.STRING,
      defaultValue: "AES-256-GCM",
    },
  },
  { timestamps: true }
);

export default EncryptedKey;