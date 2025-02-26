export interface Query {
    keyword: string;
}

export interface Result {
    data: string;
}

export interface ProductServiceController {
    search(data: Query): Promise<Result>;
}
  