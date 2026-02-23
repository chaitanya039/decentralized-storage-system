import User from "./user.model.js";
import File from "./file.model.js";
import EncryptionKey from "./encryptionkey.model.js";

// Define relations here
User.hasMany(File, { foreignKey: "ownerId", as: "files" });
File.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

EncryptionKey.belongsTo(User, { foreignKey: "userId", as: "user" });
EncryptionKey.belongsTo(File, { foreignKey: "fileId", as: "file" });

User.hasMany(EncryptionKey, { foreignKey: "userId", as: "fileKeys" });
File.hasMany(EncryptionKey, { foreignKey: "fileId", as: "userKeys" });


export { User, File, EncryptionKey };