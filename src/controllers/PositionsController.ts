import { Body, Controller, Get, Req } from '@nestjs/common';
import { ethers } from 'ethers';
import { PositionDetailsRequestBody } from './PositionDetailsRequest';

@Controller('Positions')
export class PositionController {
  constructor() {}
  @Get()
  getLPPositionDetails(@Body() request: PositionDetailsRequestBody) {
    console.log('begin');

    const { address, chainId } = request;

    //todo validate chainId

    if (!ethers.isAddress(address)) {
      throw new Error('Invalid Address');
    }

    //get transaction details.
    //need to create a service for this.
    //needs to return only currently own lp token addresses
  }
}
