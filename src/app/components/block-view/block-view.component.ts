import { Component, Input, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';


@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  styleUrls: ['./block-view.component.scss']
})
export class BlockViewComponent implements OnInit {

  @Input()
  public block: any;

  @Input()
  public selectedBlock: any;

  private blockInChain: any;

  constructor(private blockchainService: BlockchainService) {
    this.blockInChain = blockchainService.blockchainInstance.chain;
  }

  ngOnInit(): void {
  }

  blockHasTx() {
    return this.block.transactions.length > 0;
  }

  isSelectedBlock() {
    return this.block === this.selectedBlock;
  }

  getBlockNumber() {
    return this.blockInChain.indexOf(this.block) + 1;
  }

}
