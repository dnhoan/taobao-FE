import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StatusResponse } from 'src/app/enums/status-response.enum';
import { UserDTO } from 'src/app/interfaces/UserDto.interface';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: UserDTO[] = [];
  isLoading = false;

  constructor(
    private usersService: UsersService,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.usersService.getAllUsers().subscribe(
      (res: any) => {
        this.users = res.data.users.items;
      },
      (err) => {
        this.message.error('Error get list users');
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  addUserToData(event: any) {
    this.users = [event, ...this.users];
  }
  updateUserToData(event: any, index: number) {
    this.users = this.users.map((u, i) => {
      if (index === i) return event;
      return u;
    });
  }

  removeUser(id: number, index: number) {
    this.modal.create({
      nzTitle: 'Xác nhận xóa',
      nzContent: 'Bạn có muốn xóa người dùng này không?',
      nzOnOk: () => {
        this.usersService.deleteUser(id).subscribe((res: any) => {
          if (res.statusCode === StatusResponse.OK) {
            this.message.success('Delete user thanh cong');
            this.users.splice(index, 1);
          } else if (res.statusCode === StatusResponse.NO_CONTENT) {
            this.message.error('User khong ton tai');
          }
        });
      },
      nzOnCancel: () => {
        this.message.info('cancel');
      },
    });
  }
}
