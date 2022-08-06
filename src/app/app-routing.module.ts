import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatorGuardService } from './auth/guards/authenticator-guard.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthenticatorGuardService],
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then((m) => m.ShopModule),
  },
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
