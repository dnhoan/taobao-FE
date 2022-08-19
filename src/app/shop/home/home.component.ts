import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductsService } from 'src/app/admin/pages/products/product.service';
import { OrderDetailDTO } from 'src/app/interfaces/OrderDetailDTO.interface';
import { ProductDto } from 'src/app/interfaces/ProductDto.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading = false;
  products: ProductDto[] = [];
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
  addToCart(product: ProductDto) {
    let listCarts: OrderDetailDTO[];
    let cart = localStorage.getItem('carts');
    if (cart) {
      listCarts = JSON.parse(cart);
      let hasProduct = false;
      listCarts.map((cart: any) => {
        if (cart.product.id == product.id) {
          hasProduct = true;
          return { amount: cart.amount++, product, price: product.price };
        }
        return cart;
      });
      if (!hasProduct)
        listCarts.push({ amount: 1, product, price: product.price });
    } else {
      listCarts = [{ amount: 1, product, price: product.price }];
    }
    this.message.success('Thêm vào giỏ hàng thành công');
    localStorage.setItem('carts', JSON.stringify(listCarts));
  }
}
