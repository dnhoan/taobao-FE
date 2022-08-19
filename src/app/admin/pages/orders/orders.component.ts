import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserAuthService } from 'src/app/auth/user-auth.service';
import { OrderDTO } from 'src/app/interfaces/OrderDTO.interface';
import { OrderAdminService } from './order-admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: OrderDTO[] = [];
  isLoadingOrders = false;

  constructor(
    private orderAdminService: OrderAdminService,
    private userAuthService: UserAuthService,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.isLoadingOrders = true;
    this.orderAdminService.getOrders().subscribe(
      (res: any) => {
        if (res) {
          this.orders = res.data.orders.items;
        }
      },
      () => this.message.error('Lỗi lấy danh sách đơn hàng'),
      () => {
        this.isLoadingOrders = false;
      }
    );
  }
  updateOrderStatus(newOrderStatus: number, id: number, index: number): void {
    this.modal.create({
      nzTitle: 'Xác nhận hủy đơn hàng',
      nzContent: 'Bạn có muốn hủy đơn hàng này không?',
      nzOnOk: () => {
        this.orderAdminService.updateOrderStatus(id, newOrderStatus).subscribe(
          (res) => {
            if (res) {
              this.message.success('Cập nhật đơn hàng thành công');
              this.orders[index].orderStatus = newOrderStatus;
            }
          },
          (err) => this.message.error('Cập nhật đơn hàng thất bại'),
          () => {}
        );
      },
      nzOnCancel: () => {
        this.message.info('cancel');
      },
    });
  }
}
