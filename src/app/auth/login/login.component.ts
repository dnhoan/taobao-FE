import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Roles } from 'src/app/enums/roles.enum';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token.service';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = {
    email: 'admin@gmail.com',
    password: '123',
  };
  // validateForm!: FormGroup;

  constructor(
    private router: Router,
    private message: NzMessageService,
    private httpClient: HttpClient, //  private fb: FormBuilder
    private tokenService: TokenService,
    private userAuthService: UserAuthService
  ) {}

  ngOnInit(): void {
    // this.validateForm = this.fb.group({
    //   userName: [null, [Validators.required]],
    //   password: [null, [Validators.required]],
    //   remember: [true],
    // });
  }

  loginForm() {
    // console.log(this.validateForm);

    // if (this.validateForm?.valid) {
    this.httpClient
      .post(`${environment.baseUrl}/login`, this.user)
      .subscribe((res: any) => {
        if (res) {
          localStorage.setItem('token', res.data.token);
          let user: any = this.tokenService.getTokenDecode(res.data.token);
          // this.userAuthService.$currentUser.next(user);
          this.userAuthService.currentUser = user;
          if (user.role == Roles.USER) {
            this.router.navigate(['shop']);
          } else {
            this.router.navigate(['admin']);
          }
          this.message.success('login success');
        }
      });
    // }
  }
}
