import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  skip,
  switchMap,
  tap,
} from 'rxjs/operators';
import { CommonService } from 'src/app/common.service';
import { StatusResponse } from 'src/app/enums/status-response.enum';
import { CategoryDto } from 'src/app/interfaces/CategoryDto.interface';
import { ProductDto } from 'src/app/interfaces/ProductDto.interface';
import { environment } from 'src/environments/environment';
import { CategoriesService } from '../../categories/categories.service';
import { ProductsService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  @Input('productIsEditing') productIsEditing!: ProductDto;
  isVisibleModalCreateProduct = false;
  urlImg!: string;
  formProduct!: FormGroup;
  isLoadingCategory = false;
  categories: CategoryDto[] = [];
  searchTerm = new Subject<string>();
  @Output() newProduct = new EventEmitter<ProductDto>();
  @Output() productEdited = new EventEmitter<ProductDto>();
  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private message: NzMessageService,
    private categoriesService: CategoriesService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.formProduct = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(225),
        ]),
      ],
      stock: [0, Validators.compose([Validators.required, Validators.min(0)])],
      price: [0, Validators.compose([Validators.required, Validators.min(0)])],
      color: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(225),
        ]),
      ],
      size: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(225),
        ]),
      ],
      image: null,
      category: [null, Validators.required],
      status: '1',
      description: ['', Validators.compose([Validators.maxLength(225)])],
    });
    if (this.productIsEditing) {
      this.urlImg = `${environment.baseUrl}/image/${this.productIsEditing.image}`;
      this.categories = [this.productIsEditing.category];
      this.formProduct.patchValue({
        ...this.productIsEditing,
      });
    }
    this.searchTerm
      .pipe(
        skip(1),

        debounceTime(300),

        distinctUntilChanged(),

        switchMap((term: string) => {
          if (!term.trim()) {
            return of(this.categories);
          }
          return this.categoriesService
            .searchCategory(term)
            .pipe(map((res: any) => res.data.categories));
        })
      )
      .subscribe((res: any) => {
        this.categories = res;
        this.isLoadingCategory = false;
      });
  }

  showModalCreateProduct() {
    this.isVisibleModalCreateProduct = true;
  }
  handleCancel() {
    this.isVisibleModalCreateProduct = false;
  }
  handleOk() {
    this.submitForm();
  }
  submitForm() {
    if (this.formProduct.valid) {
      if (this.productIsEditing) {
        this.updateProduct();
      } else {
        this.createProduct();
      }
    }
  }
  updateProduct() {
    let product: ProductDto = { ...this.formProduct.value };
    product.id = this.productIsEditing.id;
    let updateProduct$;
    if (this.fileImg) {
      updateProduct$ = this.commonService.uploadImageProduct(this.fileImg).pipe(
        switchMap((res: any) => {
          product.image = res.data.img;
          return this.productService.updateProduct(product);
        })
      );
    } else {
      product.image = this.productIsEditing.image;
      updateProduct$ = this.productService.updateProduct(product);
    }
    updateProduct$.subscribe(
      (res: any) => {
        if (res.statusCode === StatusResponse.OK) {
          this.message.success('Cap nhat thanh cong');
          this.isVisibleModalCreateProduct = false;
          this.productIsEditing = res.data.product;
          console.log(res.data.product);

          this.productEdited.emit(res.data.product);
        } else {
          this.message.error('Cap nhat that bai');
          this.formProduct.setValue(this.productIsEditing);
        }
      },
      (err) => {
        if (err) {
          this.message.error('Cap nhat that bai');
          this.formProduct.setValue({ ...this.productIsEditing });
        }
      },
      () => {}
    );
  }
  createProduct() {
    let product: ProductDto = this.formProduct.value;
    product.image = this.fileImg.name;
    this.commonService
      .uploadImageProduct(this.fileImg)
      .pipe(
        switchMap((res: any) => {
          product.image = res.data.img;
          return this.productService.insertProduct(product);
        })
      )
      .subscribe(
        (res: any) => {
          if (res.statusCode === StatusResponse.CREATED) {
            this.message.success('Them moi nguoi dung thanh cong');
            this.formProduct.reset();
            this.isVisibleModalCreateProduct = false;
            this.newProduct.emit(res.data.product);
            this.urlImg = '';
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
  searchCategory(term: string): void {
    this.isLoadingCategory = true;
    this.searchTerm.next(term);
  }
  fileImg!: File;
  onChangeImage(event: any) {
    if (event.target.files) {
      let reader = new FileReader();
      this.fileImg = event.target.files[0];
      reader.readAsDataURL(this.fileImg);
      reader.onload = (e: any) => {
        this.urlImg = e.target.result;
      };
    }
  }
}
