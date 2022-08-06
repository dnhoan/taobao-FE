import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserDTO } from '../interfaces/UserDto.interface';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  // $currentUser = new Subject<any>();
  currentUser!: UserDTO;
  constructor() {}
}
