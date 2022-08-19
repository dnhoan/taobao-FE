import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserAuthService } from 'src/app/auth/user-auth.service';
import { OrderDetailDTO } from 'src/app/interfaces/OrderDetailDTO.interface';
import { OrderDTO } from 'src/app/interfaces/OrderDTO.interface';
import { ProductDto } from 'src/app/interfaces/ProductDto.interface';
import { environment } from 'src/environments/environment';
import { OrderShopService } from '../order-shop.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  carts: OrderDetailDTO[] = [];
  baseUrl = environment.baseUrl;
  totalMoney = 0;
  formCart!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private orderShopService: OrderShopService,
    private userAuthService: UserAuthService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.formCart = this.fb.group({
      customerName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(225),
          Validators.minLength(6),
        ]),
      ],
      phoneNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})'),
        ]),
      ],
      deliveryAddress: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
    let str_cart = localStorage.getItem('carts');
    if (str_cart) {
      this.carts = JSON.parse(str_cart);
      this.calculateTotalMoney();
    }
  }
  removeProductToCart(index: number) {
    this.carts = this.carts.filter((c, i) => i !== index);
    if (this.carts.length) this.calculateTotalMoney();
    else this.totalMoney = 0;
    localStorage.setItem('carts', JSON.stringify(this.carts));
  }
  changeAmountProduct(event: number, product: ProductDto, i: number) {
    this.carts[i].amount = event;
    this.calculateTotalMoney();
    localStorage.setItem('carts', JSON.stringify(this.carts));
  }

  calculateTotalMoney() {
    this.totalMoney = this.carts
      .map((item) => item.amount * item.product.price)
      .reduce((prev, next) => prev + next);
  }
  submitForm() {
    console.log('submit form');

    if (this.formCart.valid) {
      let order: OrderDTO = { ...this.formCart.value };
      order.orderDetailDTOS = this.carts;
      order.user = this.userAuthService.currentUser!;
      console.log(order);

      this.orderShopService.createOrder(order).subscribe((res) => {
        if (res) {
          this.message.success('Tạo đơn hàng thành công');
          this.formCart.reset();
          this.carts = [];
          this.totalMoney = 0;
          localStorage.removeItem('carts');
        }
      });
    }
  }
}
