import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardService } from '../auth/guards/authentication-guard.service';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'orders',
    component: UserOrdersComponent,
    canActivate: [AuthenticationGuardService],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthenticationGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
