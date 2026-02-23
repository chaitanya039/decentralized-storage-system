import sequelize from "../config/db";
import User from "./user.model";
import File from "./file.model";

// Define relations here
User.hasMany(File, { foreignKey: "ownerId", as: "files" });
File.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

export { sequelize, User, File };