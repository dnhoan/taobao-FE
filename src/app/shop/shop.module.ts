import { NgModule } from '@angular/core';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../shared/shared.module';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [ShopComponent, UserOrdersComponent, HomeComponent, CartComponent],
  imports: [ShopRoutingModule, SharedModule],
})
export class ShopModule {}
