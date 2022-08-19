import { Component, Input, OnInit } from '@angular/core';
import { OrderDTO } from 'src/app/interfaces/OrderDTO.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-order-detail',
  templateUrl: './user-order-detail.component.html',
  styleUrls: ['./user-order-detail.component.scss'],
})
export class UserOrderDetailComponent implements OnInit {
  @Input() order!: OrderDTO;
  isVisible = false;
  baseUrl = environment.baseUrl;
  constructor() {}

  ngOnInit(): void {}
  showModal() {
    this.isVisible = true;
  }
  handleOk() {
    this.isVisible = false;
  }
}
