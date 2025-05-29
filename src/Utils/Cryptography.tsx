import * as CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_CRYPRO_KEY || "12345";

export const encrypt = (plainText: string): string => {
  const encryptedLoad = CryptoJS.AES.encrypt(plainText, secretKey).toString();
  return encryptedLoad;
};

export const decrypt = (cipherText: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    if (!plainText) {
      throw new Error("Decryption failed or empty result");
    }
    return plainText;
  } catch (error) {
    console.error("Decryption error:", error);
    return "";
  }
};
