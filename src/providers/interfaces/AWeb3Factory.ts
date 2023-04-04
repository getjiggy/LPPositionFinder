import { ethers } from 'ethers';

export abstract class AWeb3Factory {
  abstract getProvider(chainId: number): ethers.JsonRpcProvider;
}
