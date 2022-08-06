import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserDTO } from 'src/app/interfaces/UserDto.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private message: NzMessageService) {}

  getAllUsers() {
    return this.http.get(`${environment.baseUrl}/admin/users`);
  }
  getUserById(id: number) {
    return this.http.get(`${environment.baseUrl}/admin/users/${id}`);
  }

  updateUser(user: UserDTO) {
    return this.http.put(`${environment.baseUrl}/admin/users`, { ...user });
  }
  insertUser(user: UserDTO) {
    return this.http.post(`${environment.baseUrl}/admin/users`, { ...user });
  }

  deleteUser(id: number) {
    return this.http.delete(`${environment.baseUrl}/admin/users/${id}`);
  }
}
