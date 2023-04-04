import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Axios, AxiosDefaults } from 'axios';
import { AEtherscanClient } from '../../interfaces/AEtherscanClient';

@Injectable()
export class EtherscanClient<T> extends AEtherscanClient {
  options: any;
  client: Axios;
  constructor(options) {
    super();
    this.options = options;
    this.client = new Axios();
  }
  async getERC20Transactions(address: string): Promise<any[]> {
    try {
      const resp = await this.client.post(
        this.options.base +
          this.options.tokenTransactions +
          address +
          this.options.key,
      );
      return resp.data;
    } catch (e) {
      //swallow
      const err = {
        message: 'Could not retrieve transactions',
        err: e,
      };
      throw err;
    }
  }
}
