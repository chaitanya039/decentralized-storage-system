import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const File = sequelize.define(
  "File",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    cid: {
      type: DataTypes.STRING,
      unique: true,
    },

    filename: DataTypes.STRING,
    mimeType: DataTypes.STRING,
    size: DataTypes.INTEGER,

    visibility: {
      type: DataTypes.ENUM("private", "shared", "public"),
      defaultValue: "private",
    },

    status: {
      type: DataTypes.ENUM("active", "deleted", "archived"),
      defaultValue: "active",
    },

    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { timestamps: true }
);

export default File;