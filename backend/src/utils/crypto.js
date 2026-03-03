import crypto from "crypto";

/* PASSWORD HASH KEY */
export const deriveKeyFromPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest();
};

/* GENERATE RSA KEYPAIR */
export const generateKeyPair = () => {
  return crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });
};

/* ENCRYPT PRIVATE KEY WITH PASSWORD */
export const encryptPrivateKey = (privateKey, password) => {
  const key = deriveKeyFromPassword(password);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(
    privateKey.export({ type: "pkcs1", format: "pem" }),
    "utf8",
    "hex"
  );

  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
};

/* AES FILE ENCRYPTION */
export const encryptFileBuffer = (buffer) => {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  const encrypted = Buffer.concat([
    cipher.update(buffer),
    cipher.final(),
  ]);

  return { encrypted, key, iv };
};

/* ENCRYPT AES KEY WITH PUBLIC KEY */
export const encryptAESKey = (aesKey, publicKey) => {
  return crypto.publicEncrypt(publicKey, aesKey).toString("base64");
};