import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StatusResponse } from 'src/app/enums/status-response.enum';
import { UserDTO } from 'src/app/interfaces/UserDto.interface';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  @Input('user') userEdit!: UserDTO;
  isVisibleModalAddUser = false;
  formUser!: FormGroup;
  @Output() newUser = new EventEmitter<UserDTO>();
  @Output() userEdited = new EventEmitter<UserDTO>();
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    let fbGroup: any = {
      fullname: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(225),
        ]),
      ],
      gender: 1,
      phoneNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})'),
        ]),
      ],
      address: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      image: '',
      role: 0,
      status: '1',
    };
    if (!this.userEdit) {
      fbGroup['password'] = [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ];
      // confirmPassword: [
      //   '',
      //   this.userEdit ? Validators.compose([]) : Validators.compose([]),
      // ],)
    }
    this.formUser = this.fb.group(fbGroup);
    if (this.userEdit) {
      this.formUser.patchValue({
        fullname: this.userEdit.fullname,
        gender: this.userEdit.gender,
        phoneNumber: this.userEdit.phoneNumber,
        address: this.userEdit.address,
        email: this.userEdit.email,
        image: this.userEdit.image,
        role: this.userEdit.role,
        status: this.userEdit.status,
      });
    }
  }

  showModalAddUser() {
    this.isVisibleModalAddUser = true;
  }
  handleCancel() {
    this.isVisibleModalAddUser = false;
  }
  handleOk() {
    this.submitForm();
  }
  submitForm() {
    if (this.formUser.valid) {
      if (this.userEdit) {
        this.updateUser();
      } else {
        this.insertUser();
      }
    }
  }
  updateUser() {
    let user: UserDTO = { ...this.formUser.value };
    user.image = 'no image';
    user.id = this.userEdit.id;
    this.userService.updateUser(user).subscribe(
      (res: any) => {
        if (res.statusCode === StatusResponse.OK) {
          this.message.success('Cap nhat thanh cong');
          this.isVisibleModalAddUser = false;
          this.userEdit = res.data.user;
          console.log(res.data.user);

          this.userEdited.emit(res.data.user);
        } else {
          this.message.error('Cap nhat that bai');
          this.formUser.setValue(this.userEdit);
        }
      },
      (err) => {
        if (err) {
          this.message.error('Cap nhat that bai');
          this.formUser.setValue({ ...this.userEdit });
        }
      },
      () => {}
    );
  }
  insertUser() {
    let user: UserDTO = this.formUser.value;
    user.image = 'no image';
    this.userService.insertUser(user).subscribe(
      (res: any) => {
        if (res.statusCode === StatusResponse.CREATED) {
          this.message.success('Them moi nguoi dung thanh cong');
          this.formUser.reset();
          this.isVisibleModalAddUser = false;
          this.newUser.emit(res.data.user);
        } else {
          this.message.error('Them moi nguoi dung that bai');
        }
      },
      () => {
        this.message.error('Them moi nguoi dung that bai');
      },
      () => {}
    );
  }
}
