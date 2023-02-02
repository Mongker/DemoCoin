'use strict';
const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key goes here
// Khóa riêng của bạn ở đây
const myKey = ec.keyFromPrivate(
  'b8481a6bc7135a658f6074e6f931fbdc294b82f907e11614747b540bd78e9182'
);

// From that we can calculate your public key (which doubles as your wallet address)
// Từ đó, chúng tôi có thể tính toán khóa công khai của bạn (nhân đôi địa chỉ ví của bạn)
const myWalletAddress = myKey.getPublic('hex');

// Create new instance of Blockchain class
// Tạo phiên bản mới của lớp Blockchain
const Bcoin = new Blockchain();

// Mine first block
// Khai thác khối đầu tiên
Bcoin.minePendingTransactions(myWalletAddress);

// Create a transaction & sign it with your key
// Tạo giao dịch và ký tên bằng chìa khóa của bạn
const tx1 = new Transaction(myWalletAddress, 'address2', 50);
tx1.signTransaction(myKey);
Bcoin.addTransaction(tx1);

// Mine block
// khối mỏ
// Bcoin.minePendingTransactions(myWalletAddress);

// Create second transaction
// Tạo giao dịch thứ hai
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
Bcoin.addTransaction(tx2);

// Mine block
// khối mỏ
Bcoin.minePendingTransactions(myWalletAddress);

console.log();
console.log(
  `Balance of xavier is ${Bcoin.getBalanceOfAddress(myWalletAddress)}`
);

// Uncomment this line if you want to test tampering with the chain
// Bcoin.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log('Blockchain valid?', Bcoin.isChainValid() ? 'Yes' : 'No');

// Get List Block
console.log();
const blockchain = Bcoin.getListBlock();
console.log('List Block: ', blockchain[blockchain.length - 1]);


// Get List Block
console.log();
console.log(`Transactions ${myWalletAddress} :`, Bcoin.getAllTransactionsForWallet(myWalletAddress));