import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductDto } from 'src/app/interfaces/ProductDto.interface';
import { environment } from 'src/environments/environment';
import { ProductsService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: ProductDto[] = [];
  isLoading = false;
  baseUrl = environment.baseUrl;
  constructor(
    private productService: ProductsService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getPageProduct().subscribe(
      (res: any) => {
        this.products = res.data.products.items;
      },
      (err) => {
        this.message.error('Error get list users');
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  addProductToData(event: any) {
    this.products = [event, ...this.products];
  }
  updateProductToData(event: any, index: number) {
    this.products = this.products.map((u, i) => {
      if (index === i) return event;
      return u;
    });
  }
  removeProduct(id: number, index: number) {}
}
