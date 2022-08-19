import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../auth/user-auth.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  constructor(
    public userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  logout() {
    this.userAuthService.currentUser = undefined;
    localStorage.removeItem('token');
    this.router.navigate(['auth/login']);
  }
}
