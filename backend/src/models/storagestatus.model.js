// models/StorageStatus.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import File from "./file.model.js";

const StorageStatus = sequelize.define(
  "StorageStatus",
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

    cid: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    replicaCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    targetReplication: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
    },

    nodesPinned: {
      type: DataTypes.JSON,
      defaultValue: [],
    },

    status: {
      type: DataTypes.ENUM("healthy", "degraded", "missing"),
      defaultValue: "healthy",
    },

    lastCheckedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "storage_status",
    timestamps: true,
  }
);

export default StorageStatus;