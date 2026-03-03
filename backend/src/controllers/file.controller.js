import File from "../models/file.model.js";
import EncryptedKey from "../models/encryptkey.model.js";
import User from "../models/user.model.js";

import fs from "fs";

import {
  encryptFileBuffer,
  encryptAESKey,
} from "../utils/crypto.js";

import { generateCID } from "../utils/cid.js";

export const uploadFile = async (req, res) => {
  try {
    const fileBuffer = fs.readFileSync(req.file.path);

    /* AES encryption */
    const { encrypted, key } =
      encryptFileBuffer(fileBuffer);

    /* get user */
    const user = await User.findByPk(req.user.id);

    /* encrypt aes key with public key */
    const encryptedKey = encryptAESKey(
      key,
      user.publicKey
    );

    /* IPFS Upload (COMMENTED) */
    /*
    const cid = await uploadToIPFS(encrypted);
    */

    const cid = generateCID();

    /* store file */
    const newFile = await File.create({
      ownerId: user.id,
      cid,
      filename: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
    });

    /* store encrypted key */
    await EncryptedKey.create({
      fileId: newFile.id,
      userId: user.id,
      encryptedKey,
    });

    res.json({
      message: "File uploaded securely",
      cid,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};