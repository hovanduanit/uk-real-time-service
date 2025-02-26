import { Injectable } from '@nestjs/common';
import { ProductServiceController, Query, Result } from './product.interface';
@Injectable()
export class ProductService implements ProductServiceController {
  async search(data: Query): Promise<Result> {
    const mockUser = { data: data.keyword};
    return mockUser;
  }
}
