import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { AWeb3Factory } from '../interfaces/AWeb3Factory';

@Injectable()
export class Web3Factory extends AWeb3Factory {
  providers: { [chainId: number]: ethers.JsonRpcProvider };
  constructor(readonly config: ConfigService) {
    super();
    const networks = config.getOrThrow('networks');
    for (const [chainId, url] of Object.entries(networks)) {
      //todo remove at, get typing right
      this.providers[chainId] = new ethers.JsonRpcProvider(
        url as string,
        chainId,
      );
    }
  }
  getProvider(chainId: number) {
    return this.providers[chainId];
  }
}
