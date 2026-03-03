// models/FileAccess.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import File from "./file.model.js";

const FileAccess = sequelize.define(
  "FileAccess",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    fileId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: File,
        key: "id",
      },
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },

    permission: {
      type: DataTypes.ENUM("read", "write", "owner"),
      allowNull: false,
    },

    grantedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    revokedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "file_access",
    timestamps: true,
    createdAt: true,
    updatedAt: false,
  }
);

export default FileAccess;