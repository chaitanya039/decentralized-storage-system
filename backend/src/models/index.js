import User from "./user.model.js";
import File from "./file.model.js";
import FileAccess from "./fileaccess.model.js";
import AuditLog from "./auditlog.model.js";
import StorageStatus from "./storagestatus.model.js";
import BlockchainRecord from "./blockchain.model.js";

/* USER → FILE */
User.hasMany(File, { foreignKey: "ownerId" });
File.belongsTo(User, { foreignKey: "ownerId" });

/* FILE ACCESS */
File.hasMany(FileAccess, { foreignKey: "fileId" });
User.hasMany(FileAccess, { foreignKey: "userId" });

/* AUDIT */
User.hasMany(AuditLog, { foreignKey: "actorId" });
File.hasMany(AuditLog, { foreignKey: "fileId" });

/* STORAGE */
File.hasOne(StorageStatus, { foreignKey: "fileId" });

/* BLOCKCHAIN */
File.hasMany(BlockchainRecord, { foreignKey: "fileId" });