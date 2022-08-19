import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserAuthService } from 'src/app/auth/user-auth.service';
import { OrderDTO } from 'src/app/interfaces/OrderDTO.interface';
import { OrderShopService } from '../order-shop.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
})
export class UserOrdersComponent implements OnInit {
  orders: OrderDTO[] = [];
  isLoadingOrders = false;

  constructor(
    private orderShopService: OrderShopService,
    private userAuthService: UserAuthService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.isLoadingOrders = true;
    this.orderShopService
      .getOrdersByUserId(this.userAuthService.currentUser!.id)
      .subscribe(
        (res: any) => {
          if (res) {
            console.log(res);
            this.orders = res.data.orders.items;
          }
        },
        () => this.message.error('Lỗi lấy danh sách đơn hàng'),
        () => {
          this.isLoadingOrders = false;
        }
      );
  }
  cancelOrder(id: number) {}
}
