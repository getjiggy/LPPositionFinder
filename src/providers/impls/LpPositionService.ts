import { Injectable } from '@nestjs/common';
import { channel } from 'diagnostics_channel';
import { AnkrProvider } from 'ethers';
import { ABlockExplorerClientFactory } from '../interfaces/ABlockExplorerClientFactory';
import { AEtherscanClient } from '../interfaces/AEtherscanClient';
import { AWeb3Factory } from '../interfaces/AWeb3Factory';

@Injectable()
export class LPPositionService {
  constructor(
    readonly web3Factory: AWeb3Factory,
    readonly blockExplorerClientFactory: ABlockExplorerClientFactory,
  ) {}
  async getCurrentLpTokens(params: { address: string; chainId: number }) {
    const { address, chainId } = params;
    try {
      const provider = this.web3Factory.getProvider(chainId);
      //get all transactions from the address
      const explorer =
        this.blockExplorerClientFactory.getExplorerClient(chainId);
      const txns = await explorer.getERC20Transactions(address);
    } catch (e) {
      //capture and rethrow
      const err = {
        message: 'Unable to retrieve current LP positions',
        err: e,
      };
      throw err;
    }
  }
}
