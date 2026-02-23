import { DataTypes } from "sequelize";
import sequelize from "../config/db";

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
        cid: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        visibility: {
            type: DataTypes.ENUM("private", "shared", "public"),
            defaultValue: "private"
        },
        status: {
            type: DataTypes.ENUM("active", "deleted", "archived"),
            defaultValue: "active"
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