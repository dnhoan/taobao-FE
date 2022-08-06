import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd/message';
import { environment } from 'src/environments/environment';
import { TokenService } from './auth/token.service';
import { UserAuthService } from './auth/user-auth.service';
import { StatusResponse } from './enums/status-response.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'spring boot';

  constructor(
    private userAuthService: UserAuthService,
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    let token = localStorage.getItem('token');
    if (token) {
      let uid: any = this.tokenService.getTokenDecode(token);
      this.httpClient
        .get(`${environment.baseUrl}/admin/users/${uid.id}`)
        .subscribe((res: any) => {
          if (res.statusCode == StatusResponse.OK) {
            this.userAuthService.currentUser = res.data.user;
          } else if (res.statusCode == StatusResponse.NO_CONTENT) {
            this.message.info('Vui lòng đăng nhập');
            this.router.navigate(['/auth/login']);
          }
        });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
