import { NgModule } from '@angular/core';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../shared/shared.module';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CommonModule } from '@angular/common';
import { UserOrderDetailComponent } from './user-orders/user-order-detail/user-order-detail.component';

@NgModule({
  declarations: [
    ShopComponent,
    UserOrdersComponent,
    HomeComponent,
    CartComponent,
    UserOrderDetailComponent,
  ],
  imports: [ShopRoutingModule, SharedModule, CommonModule],
})
export class ShopModule {}
