// 

'use strict';
const EC = require('elliptic').ec;

// You can use any elliptic curve you want
const ec = new EC('secp256k1');

// Generate a new key pair and convert them to hex-string
// Tạo một cặp khóa mới và chuyển đổi chúng thành chuỗi hex
const key = ec.genKeyPair('monglvx');
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

// Print the keys to the console
// In các phím vào bàn điều khiển
console.log();
console.log(
  'Your public key (also your wallet address, freely shareable)\n',
  publicKey
);

console.log();
console.log(
  'Your private key (keep this secret! To sign transactions)\n',
  privateKey
);
