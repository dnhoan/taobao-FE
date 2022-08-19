import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './pages/users/users.component';
import { SharedModule } from '../shared/shared.module';
import { UserDetailComponent } from './pages/users/user-detail/user-detail.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderDetailAdminComponent } from './pages/orders/order-detail-admin/order-detail-admin.component';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    UserDetailComponent,
    CategoriesComponent,
    ProductsComponent,
    ProductDetailComponent,
    OrdersComponent,
    OrderDetailAdminComponent
  ],
  imports: [AdminRoutingModule, SharedModule, CommonModule],
})
export class AdminModule {}
