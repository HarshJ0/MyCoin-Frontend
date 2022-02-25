import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-blockchain-viewer',
  templateUrl: './blockchain-viewer.component.html',
  styleUrls: ['./blockchain-viewer.component.scss']
})
export class BlockchainViewerComponent implements OnInit {

  public blocks = [] as any;
  public selectedBlock;

  constructor(private blockchainService: BlockchainService) {
    this.blocks = blockchainService.getBlocks();
    this.selectedBlock = this.blocks[0];
  }

  ngOnInit(): void {
  }

  showTransactions(block: any) {
    this.selectedBlock = block;
  }
  blockHasTx(block: { transactions: string | any[]; }) {
    return block.transactions.length > 0;
  }

  selectedBlockHasTx() {
    return this.blockHasTx(this.selectedBlock);
  }

  isSelectedBlock(block: any) {
    return this.selectedBlock === block;
  }

  getBlockNumber(block: any) {
    return this.blocks.indexOf(block) + 1;
  }
}
