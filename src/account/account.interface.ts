export interface GetAccountRequest {
id: string;
}

export interface GetAccountResponse {
id: string;
name: string;
email: string;
}

export interface AccountServiceController {
getAccount(data: GetAccountRequest): Promise<GetAccountResponse>;
}
  