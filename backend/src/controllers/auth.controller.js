import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  generateKeyPair,
  encryptPrivateKey,
} from "../utils/crypto.js";

/* REGISTER */
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const { publicKey, privateKey } = generateKeyPair();

    const encryptedPrivateKey = encryptPrivateKey(
      privateKey,
      password
    );

    const user = await User.create({
      email,
      passwordHash: hash,
      publicKey: publicKey.export({ type: "pkcs1", format: "pem" }),
      encryptedPrivateKey,
    });

    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

/* LOGIN */
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(400).json("User not found");

  const match = await bcrypt.compare(password, user.passwordHash);

  if (!match) return res.status(400).json("Invalid password");

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET
  );

  user.lastLoginAt = new Date();
  await user.save();

  res.json({ token });
};

/* LOGOUT (JWT based) */
export const logout = async (req, res) => {
  res.json("Logout success");
};