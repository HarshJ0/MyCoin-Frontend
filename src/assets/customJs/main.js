const { BlockChain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('ec28ed351733dadd0cf323332bde7c6f1cc0e31c5b02ea2a324cc223d004d3eb');
const myWalletAddress = myKey.getPublic('hex');

let MyCoin = new BlockChain();

const tx1 = new Transaction(myWalletAddress, 'Public Key of Receiver', 10);
tx1.signTransaction(myKey);

MyCoin.addTransaction(tx1);

console.log("\nStarting the miner...");
MyCoin.minePendingTransactions(myWalletAddress);

console.log('\nThe balance of the miner is:', MyCoin.getBalanceOfAddress(myWalletAddress));

// MyCoin.chain[1].transactions[0].amount = 1;

console.log('Is chain Valid? ', MyCoin.isChainValid());










