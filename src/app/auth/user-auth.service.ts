import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserDTO } from '../interfaces/UserDto.interface';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  currentUser!: UserDTO | undefined;
  constructor() {}
}
