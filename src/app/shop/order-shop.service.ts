import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from 'src/environments/environment';
import { OrderDTO } from '../interfaces/OrderDTO.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderShopService {
  constructor(
    private httpClient: HttpClient,
    private message: NzMessageService
  ) {}

  createOrder(order: OrderDTO) {
    return this.httpClient.post(`${environment.baseUrl}/orders`, { ...order });
  }

  getOrdersByUserId(user_id: number, offsite?: number, limit?: number) {
    return this.httpClient.get(
      `${environment.baseUrl}/orders?user_id=${user_id}`
    );
  }
}
