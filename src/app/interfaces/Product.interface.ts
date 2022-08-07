import { Byte } from '@angular/compiler/src/util';
import { CategoryDto } from './CategoryDto.interface';

export interface Product {
  name: string;
  stock: number;
  price: number;
  color: string;
  size: string;
  image: Byte;
  category: CategoryDto;
  status: number;
  description: string;
}
