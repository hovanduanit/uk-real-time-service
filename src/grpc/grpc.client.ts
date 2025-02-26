import * as path from 'path';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';

interface AccountService {
  GetAccount(data: { id: string }): Observable<{ id: string; name: string; email: string }>;
}

@Injectable()
export class GrpcClientService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5001',
      package: 'account',
      protoPath: path.join(process.cwd(), '/src/protos/account/account.proto'),
    },
  })
  private client: ClientGrpc;

  private accountService: AccountService;

  onModuleInit() {
    this.accountService = this.client.getService<AccountService>('AccountService');
  }

  async getAccount(id: string) {
    return this.accountService.GetAccount({ id }).toPromise();
  }
}
