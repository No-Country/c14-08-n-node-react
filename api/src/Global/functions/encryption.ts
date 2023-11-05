import * as CryptoJS from 'crypto-js';

export const encrypt = async (pass_word: string) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(pass_word),
    'nest_random+',
  ).toString();
};

export const compare = async (pass_word_bd: string, pass_word_user: string) => {
  const PassEnBytes = CryptoJS.AES.decrypt(
    pass_word_bd,
    'nest_random+',
  ).toString(CryptoJS.enc.Utf8);
  const PassDescriptada = PassEnBytes;
  if (
    PassDescriptada.replace(/['"]+/g, '') ===
    pass_word_user.replace(/['"]+/g, '')
  )
    return true;
  else return false;
};
