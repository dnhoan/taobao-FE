import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserAuthService } from '../auth/user-auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  isCollapsed = false;
  constructor(
    private userAuthService: UserAuthService,
    private route: Router
  ) {}

  ngOnInit(): void {}
  logout() {
    this.userAuthService.currentUser = undefined;
    localStorage.removeItem('token');
    this.route.navigate(['auth/login']);
  }
}
