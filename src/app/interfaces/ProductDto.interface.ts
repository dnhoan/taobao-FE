import { CategoryDto } from './CategoryDto.interface';

export interface ProductDto {
  id: number;
  name: string;
  stock: number;
  price: number;
  color: string;
  size: string;
  image: string;
  category: CategoryDto;
  status: number;
  description: string;
}
