import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './pages/users/users.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { UserDetailComponent } from './pages/users/user-detail/user-detail.component';

@NgModule({
  declarations: [AdminComponent, UsersComponent, UserDetailComponent],
  imports: [AdminRoutingModule, SharedModule, CommonModule],
})
export class AdminModule {}
