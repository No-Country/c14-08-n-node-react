import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

export const encrypt = async (pass_word: string) => {
  const iv = randomBytes(16);
  const key = (await promisify(scrypt)(pass_word, 'salt', 32)) as Buffer;
  const cipher = createCipheriv('aes-256-gcm', key, iv);

  const textToEncrypt = pass_word; // Utilizamos la contraseña original
  const encryptedText = Buffer.concat([
    cipher.update(textToEncrypt),
    cipher.final(),
  ]);

  // Convierte el resultado en un valor hexadecimal como cadena
  const encryptedHex = encryptedText.toString('hex');

  return encryptedHex;
};
