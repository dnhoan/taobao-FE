import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  getTokenDecode(token: string) {
    return jwt_decode(token);
  }
}
