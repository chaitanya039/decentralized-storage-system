// models/AuditLog.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import File from "./file.model.js";

const AuditLog = sequelize.define(
  "AuditLog",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    actorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },

    actionType: {
      type: DataTypes.ENUM(
        "upload",
        "share",
        "revoke",
        "delete",
        "download"
      ),
      allowNull: false,
    },

    fileId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: File,
        key: "id",
      },
    },

    ipAddress: {
      type: DataTypes.STRING,
    },

    userAgent: {
      type: DataTypes.STRING,
    },

    metadata: {
      type: DataTypes.JSON,
    },
  },
  {
    tableName: "audit_logs",
    timestamps: true,
    createdAt: true,
    updatedAt: false,
  }
);

export default AuditLog;