import { Injectable } from '@nestjs/common';
import { AccountServiceController, GetAccountRequest, GetAccountResponse } from './account.interface';
@Injectable()
export class AccountService implements AccountServiceController {
    getAccount(data: GetAccountRequest): Promise<GetAccountResponse> {
        throw new Error('Method not implemented.');
    }
  
}
