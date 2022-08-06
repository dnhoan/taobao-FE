import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Roles } from 'src/app/enums/roles.enum';
import { UserAuthService } from '../user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatorGuardService implements CanActivate {
  constructor(private userAuthService: UserAuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userAuthService.currentUser) {
      return this.userAuthService.currentUser.role === Roles.ADMIN;
    }
    return false;
  }
}
