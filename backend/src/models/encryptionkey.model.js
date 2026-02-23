import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const EncryptionKey = sequelize.define(
    "EncryptionKey",
    {
         id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        fileId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: "file_id",
            references: {
                model: "files",
                key: "id"
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: "user_id",
            references: {
                model: "users",
                key: "id"
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        },
        encryptedKey: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "encryption_keys",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
        indexes: [
            {
                unique: true,
                fields: ["file_id", "user_id"]  // Enforcing only one row per pair
            }
        ] 
    }
);

export default EncryptionKey;