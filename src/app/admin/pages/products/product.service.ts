import { HttpClient } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductDto } from 'src/app/interfaces/ProductDto.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private message: NzMessageService) {}

  getPageProduct() {
    return this.http.get(`${environment.baseUrl}/admin/products`);
  }
  getProductById(id: number) {
    return this.http.get(`${environment.baseUrl}/admin/products/${id}`);
  }

  uploadImage(file: Byte) {
    return this.http.post(`${environment.baseUrl}/uploadImage`, {
      file,
    });
  }

  updateProduct(product: ProductDto) {
    return this.http.put(`${environment.baseUrl}/admin/products`, {
      ...product,
    });
  }
  insertProduct(product: any) {
    return this.http.post(`${environment.baseUrl}/admin/products`, {
      ...product,
    });
  }

  deleteProduct(id: number) {
    return this.http.delete(`${environment.baseUrl}/admin/products/${id}`);
  }
}
