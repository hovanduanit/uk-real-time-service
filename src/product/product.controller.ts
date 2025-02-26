import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Query, Result } from './product.interface';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod('ProductService', 'Search')
  async search(data: Query): Promise<Result> {
    return this.productService.search(data);
  }
}
