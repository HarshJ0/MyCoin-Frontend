import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockchainService, IWalletKey } from 'src/app/services/blockchain.service';
import { Transaction } from 'src/assets/customJs/blockchain';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {

  public newTx = new Transaction();
  public ownWalletKey: IWalletKey;

  constructor(private blockchainService: BlockchainService, private router: Router) {
    this.newTx = new Transaction();
    this.ownWalletKey = blockchainService.walletKeys[0];
  }

  ngOnInit(): void {
  }

  createTransaction() {
    const newTx = this.newTx;
    this.newTx.fromAddress = this.ownWalletKey.publicKey;
    this.newTx.signTransaction(this.ownWalletKey.keyObj);

    this.blockchainService.addTransaction(this.newTx);

    this.router.navigate(['/new/transaction/pending', { addedTx: true }]);
    this.newTx = new Transaction;
  }

}
