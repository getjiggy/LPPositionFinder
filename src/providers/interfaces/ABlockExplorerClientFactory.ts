export abstract class ABlockExplorerClientFactory {
  abstract getExplorerClient(chainId: number): any;
}
