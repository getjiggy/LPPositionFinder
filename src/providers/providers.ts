import { EtherscanClient } from './impls/Etherscan/EtherscanClient';
import { Web3Factory } from './impls/Web3Factory';
import { AEtherscanClient } from './interfaces/AEtherscanClient';
import { AWeb3Factory } from './interfaces/AWeb3Factory';

export const providers = [
  {
    provide: AWeb3Factory,
    useClass: Web3Factory,
  },
  { provide: AEtherscanClient, useClass: EtherscanClient },
];
