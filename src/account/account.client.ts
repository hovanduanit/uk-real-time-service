// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { credentials } from '@grpc/grpc-js';
// import { AccountService } from '../grpc/grpc.client';

// @Injectable()
// export class AccountClientService implements OnModuleInit {
//   private accountClient: any;

//   onModuleInit() {
//     this.accountClient = new AccountService('localhost:50051', credentials.createInsecure());
//   }

//   async getAccount(id: string): Promise<any> {
//     return new Promise((resolve, reject) => {
//       this.accountClient.GetAccount({ id }, (err, response) => {
//         if (err) reject(err);
//         else resolve(response);
//       });
//     });
//   }
// }    
