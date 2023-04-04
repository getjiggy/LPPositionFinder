import { Blockchain } from './Blockchain';

require('dotenv').config();
const getRpc = (chainId: number): string | undefined => {
  return process.env[`RPC_${chainId}`];
};

export default () => ({
  networks: {
    [Blockchain.EthereumMainnet.chainId]: getRpc(
      Blockchain.EthereumMainnet.chainId,
    ),
  },

  blockExplorer: {
    [Blockchain.EthereumMainnet.chainId]: {
      base: 'https://api.etherscan.io/api',
      tokenTransactions: '?module=account&action=tokentx&address=',
      key: `&apiKey=${process.env.ETHERSCAN_ID}`,
    },
  },
});
