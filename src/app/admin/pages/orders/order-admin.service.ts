import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { OrderDTO } from 'src/app/interfaces/OrderDTO.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderAdminService {
  constructor(
    private httpClient: HttpClient,
    private message: NzMessageService
  ) {}

  createOrder(order: OrderDTO) {
    return this.httpClient.post(`${environment.baseUrl}/admin/orders`, {
      ...order,
    });
  }
  updateOrder(order: OrderDTO) {
    return this.httpClient.put(`${environment.baseUrl}/admin/orders`, {
      ...order,
    });
  }
  updateOrderStatus(id: number, newOrderStatus: number) {
    return this.httpClient.put(`${environment.baseUrl}/admin/orders/${id}`, {
      newOrderStatus,
    });
  }

  getOrders(offsite?: number, limit?: number) {
    return this.httpClient.get(`${environment.baseUrl}/admin/orders`);
  }
  getOrderByOrderId(order_id: string) {
    return this.httpClient.get(
      `${environment.baseUrl}/admin/orders/${order_id}`
    );
  }
}
