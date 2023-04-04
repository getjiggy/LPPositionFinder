//only 2 events per protocol, so one class is fine

import { BigNumberish, ethers, Log, LogDescription } from 'ethers';
import abi from '../../../abis/UniswapV3';

export interface DecodedLog extends LogDescription {
  address: string;
  block: number;
}

export class UniswapV3EventParser {
  events: { mint: string; burn: string } = { mint: 'Mint', burn: 'Burn' };
  ifc: ethers.Interface;
  constructor() {
    this.ifc = new ethers.Interface(abi);
  }
  parseEvents(events: Log[]) {
    const lpPositions: {
      //token address to
      [lp: string]: {
        amount: bigint;
        opened?: number;
        closed?: number;
      };
    } = {};
    const liquidityEvents = events
      .map((e) => this.getParsedLog(e))
      .filter((p) => p);

    for (const event of liquidityEvents) {
      if (!lpPositions[event.address]) {
        lpPositions[event.address] = { amount: event.args.amount as bigint };
      }

      switch (event.name) {
        case this.events.burn: {
          lpPositions[event.address].amount -= event.args.amount;
          lpPositions[event.address].closed = event.block;
          break;
        }
        case this.events.mint: {
          lpPositions[event.address].opened = event.block;
          lpPositions[event.address].amount += event.args.amount;
          break;
        }

        default: {
          throw new Error('Unrecognized Event name');
        }
      }
      return lpPositions;
    }
  }

  getParsedLog(event: Log): DecodedLog {
    let res: DecodedLog;

    try {
      const decoded = this.ifc.parseLog({
        topics: event.topics.map((t) => t),
        data: event.data,
      });
      if (Object.values(this.events).includes(decoded.name)) {
        res = { ...decoded, address: event.address, block: event.blockNumber };
      }
    } catch {
      //swallow
    }
    return res;
  }
}
