import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { OrderDetailDTO } from 'src/app/interfaces/OrderDetailDTO.interface';
import { OrderDTO } from 'src/app/interfaces/OrderDTO.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailService {
  constructor(
    private httpClient: HttpClient,
    private message: NzMessageService
  ) {}

  createOrderDetail(orderDetail: OrderDetailDTO) {
    return this.httpClient.post(`${environment.baseUrl}/admin/order_detail`, {
      ...orderDetail,
    });
  }
  updateOrderDetail(orderDetail: OrderDetailDTO) {
    return this.httpClient.put(`${environment.baseUrl}/admin/order_detail`, {
      ...orderDetail,
    });
  }
  deleteOrderDetail(orderDetailId: number) {
    return this.httpClient.delete(
      `${environment.baseUrl}/admin/order_detail/${orderDetailId}`
    );
  }
}
