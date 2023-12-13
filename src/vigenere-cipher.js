const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    this.validateInput(message, key);

    message = message.toUpperCase();
    key = key.toUpperCase();

    let result = '';

    for (let i = 0, j = 0; i < message.length; i++) {
      const currentChar = message[i];
      if (this.isUppercaseLetter(currentChar)) {
        const messageCharCode = currentChar.charCodeAt(0);
        const keyCharCode = key[j % key.length].charCodeAt(0);

        const encryptedCharCode = this.calculateVigenereCipher(messageCharCode, keyCharCode);
        result += String.fromCharCode(encryptedCharCode);

        j++;
      } else {
        result += currentChar;
      }
    }

    return this.isDirect ? result : result.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    this.validateInput(encryptedMessage, key);

    encryptedMessage = encryptedMessage.toUpperCase();
    key = key.toUpperCase();

    let result = '';

    for (let i = 0, j = 0; i < encryptedMessage.length; i++) {
      const currentChar = encryptedMessage[i];
      if (this.isUppercaseLetter(currentChar)) {
        const encryptedCharCode = currentChar.charCodeAt(0);
        const keyCharCode = key[j % key.length].charCodeAt(0);

        const decryptedCharCode = this.calculateVigenereDecipher(encryptedCharCode, keyCharCode);
        result += String.fromCharCode(decryptedCharCode);

        j++;
      } else {
        result += currentChar;
      }
    }

    return this.isDirect ? result : result.split('').reverse().join('');
  }

  validateInput(message, key) {
    if ((!message && message !== '') || (!key && key !== '')) {
      throw new Error('Both message and key are required.');
    }

    if (typeof message !== 'string' || typeof key !== 'string') {
      throw new Error('Both message and key should be strings.');
    }

    if (!message.trim() || !key.trim()) {
      throw new Error('Both message and key should not be empty.');
    }
  }

  isUppercaseLetter(char) {
    return /^[A-Z]$/.test(char);
  }

  calculateVigenereCipher(messageCharCode, keyCharCode) {
    return ((messageCharCode + keyCharCode) % 26) + 'A'.charCodeAt(0);
  }

  calculateVigenereDecipher(encryptedCharCode, keyCharCode) {
    const result = (encryptedCharCode - keyCharCode + 26) % 26;
    return result + 'A'.charCodeAt(0);
  }
}

module.exports = {
  VigenereCipheringMachine
};
