import { ProductDto } from './ProductDto.interface';

export interface OrderDetailDTO {
  id?: number;
  amount: number;
  price: number;
  orderId?: number;
  product: ProductDto;
}
