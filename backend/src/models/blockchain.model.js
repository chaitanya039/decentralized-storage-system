// models/BlockchainRecord.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import File from "./file.model.js";

const BlockchainRecord = sequelize.define(
  "BlockchainRecord",
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

    transactionHash: {
      type: DataTypes.STRING,
    },

    blockNumber: {
      type: DataTypes.BIGINT,
    },

    chainId: {
      type: DataTypes.STRING,
    },

    ownerAddress: {
      type: DataTypes.STRING,
    },

    recordedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "blockchain_records",
    timestamps: false,
  }
);

export default BlockchainRecord;