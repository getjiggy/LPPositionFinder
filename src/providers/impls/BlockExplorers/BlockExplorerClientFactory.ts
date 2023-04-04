import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Blockchain } from '../../../config/Blockchain';
import { ABlockExplorerClientFactory } from '../../interfaces/ABlockExplorerClientFactory';
import { AEtherscanClient } from '../../interfaces/AEtherscanClient';

@Injectable()
export class BlockExplorerClientFactory extends ABlockExplorerClientFactory {
  constructor(readonly etherscan: AEtherscanClient) {
    super();
  }

  getExplorerClient(chainId: number) {
    switch (chainId) {
      case Blockchain.EthereumMainnet.chainId: {
        return this.etherscan;
      }
      default: {
        throw new Error('BlockExplorer not implemented');
      }
    }
  }
}
