import { Injectable } from '@angular/core';
import { BlockChain } from 'src/assets/customJs/blockchain.js';
import * as EC from "elliptic";

@Injectable({
  providedIn: 'root'
})

export class BlockchainService {

  public blockchainInstance = new BlockChain();
  public walletKeys: Array<IWalletKey> = [];

  constructor() {
    this.blockchainInstance.difficulty = 2;
    this.blockchainInstance.minePendingTransactions('my-wallet-address');
    this.generateWalletKeys();
  }

  getBlocks() {
    return this.blockchainInstance.chain;
  }

  addTransaction(tx: any) {
    this.blockchainInstance.addTransaction(tx);
  }

  getPendingTransactions() {
    return this.blockchainInstance.pendingTransactions;
  }

  minePendingTransactions() {
    this.blockchainInstance.minePendingTransactions(
      this.walletKeys[0].publicKey
    )
  }

  addressIsFromCurrentUser(address: string) {
    return address === this.walletKeys[0].publicKey;
  }

  private generateWalletKeys() {
    const ec = new EC.ec('secp256k1');
    const key = ec.genKeyPair();
    this.walletKeys.push({
      keyObj: key,
      publicKey: key.getPublic('hex'),
      privateKey: key.getPrivate('hex')
    });
  }
}
export interface IWalletKey {
  keyObj: any;
  publicKey: string;
  privateKey: string;
}