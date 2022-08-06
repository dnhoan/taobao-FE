import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserAuthService } from '../user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuardService implements CanActivate {
  constructor(private userAuthService: UserAuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean | UrlTree> {
    if (this.userAuthService.currentUser) return true;
    return false;
  }
}
