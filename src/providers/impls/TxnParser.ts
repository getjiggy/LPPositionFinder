import { Injectable } from '@nestjs/common';
import { AWeb3Factory } from '../interfaces/AWeb3Factory';

@Injectable()
export class TransactionParser {
  constructor(readonly web3Factory: AWeb3Factory) {}

  async parseTransactions(txnHashes: string[], chainId: number) {
    try {
      const provider = this.web3Factory.getProvider(chainId);
      const getTxnData = async (hash: string) => {
        return provider.getTransactionReceipt(hash);
      };
      const pendingReceipts = txnHashes.map((h) => getTxnData(h));
      const resolvedReceipts = await Promise.all(pendingReceipts);
    } catch (e) {}
  }
}
