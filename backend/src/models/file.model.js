import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const File = sequelize.define(
    "File",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        ownerId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: "owner_id",
            references: {
                model: "users",
                key: "id"
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mimeType: {
            type: DataTypes.STRING,
            field: "mime_type"
        },
        size: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        cid: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        visibility: {
            type: DataTypes.ENUM("private", "shared", "public"),
            defaultValue: "private",
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("active", "deleted", "archived"),
            defaultValue: "active",
            allowNull: false
        }
    }, 
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at"
    }
);

export default File;