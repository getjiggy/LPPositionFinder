export abstract class AEtherscanClient {
  abstract getERC20Transactions(address: string): Promise<any[]>;
}
