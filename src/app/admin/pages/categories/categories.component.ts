import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StatusResponse } from 'src/app/enums/status-response.enum';
import { CategoryDto } from 'src/app/interfaces/CategoryDto.interface';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories!: CategoryDto[];
  isLoading = false;
  isVisibleModalCategory = false;
  isEditing = false;
  category: CategoryDto = {
    id: 0,
    name: '',
    status: 1,
  };
  constructor(
    private categoriesService: CategoriesService,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.categoriesService.getPageCategory().subscribe(
      (res: any) => {
        this.categories = res.data.categories.items;
      },
      (err) => {
        this.message.error('Error get list users');
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  removeCategory(id: number, index: number) {
    this.modal.create({
      nzTitle: 'Xac nhan xoa',
      nzContent: 'Ban co thuc su muon xoa danh muc nay khong',
      nzOnOk: () => {
        this.categoriesService.deleteCategory(id).subscribe((res: any) => {
          if (res.statusCode === StatusResponse.OK) {
            this.message.success('Xoa danh muc thanh cong');
            this.categories = this.categories.map((ca) => {
              if (ca.id == res.data.category.id) {
                return res.data.category;
              } else return ca;
            });
          } else if (res.statusCode === StatusResponse.NO_CONTENT) {
            this.message.error('Danh muc khong ton tai');
          }
        });
      },
      nzOnCancel: () => {
        this.message.info('cancel');
      },
    });
  }
  handleCancel() {
    this.isVisibleModalCategory = false;
  }
  handleOk() {
    this.isVisibleModalCategory = false;
  }
  showModalAddCategory() {
    this.category = {
      id: 0,
      name: '',
      status: 1,
    };
    this.isEditing = false;
    this.isVisibleModalCategory = true;
  }
  showModalEditCategory(ca: CategoryDto) {
    this.category = { ...ca };
    this.isEditing = true;
    this.isVisibleModalCategory = true;
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.isEditing) {
        this.categoriesService.updateCategory(this.category).subscribe(
          (res: any) => {
            if (res.statusCode === StatusResponse.OK) {
              this.message.success('Cap nhat thanh cong');
              this.isVisibleModalCategory = false;
              this.categories = this.categories.map((ca) => {
                if (ca.id == this.category.id) {
                  return res.data.category;
                } else return ca;
              });
            } else {
              this.message.error('Cap nhat that bai');
            }
          },
          () => {
            this.message.error('Cap nhat that bai');
          },
          () => {}
        );
      } else {
        this.categoriesService
          .insertCategory({
            name: this.category.name,
            status: this.category.status,
          })
          .subscribe(
            (res: any) => {
              if (res.statusCode === StatusResponse.CREATED) {
                this.message.success('Them moi danh muc thanh cong');
                this.isVisibleModalCategory = false;
                this.categories = [res.data.category, ...this.categories];
              } else {
                this.message.error('Them moi danh muc that bai');
              }
            },
            () => {
              this.message.error('Them moi danh muc that bai');
            },
            () => {}
          );
      }
    }
  }
  deleteCategory() {}
  checkCategoryExist() {}
}
