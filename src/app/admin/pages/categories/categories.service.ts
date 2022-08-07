import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryDto } from 'src/app/interfaces/CategoryDto.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient, private message: NzMessageService) {}

  getPageCategory() {
    return this.http.get(`${environment.baseUrl}/admin/categories`);
  }
  getCategoryById(id: number) {
    return this.http.get(`${environment.baseUrl}/admin/categories/${id}`);
  }

  updateCategory(category: CategoryDto) {
    return this.http.put(`${environment.baseUrl}/admin/categories`, {
      ...category,
    });
  }
  insertCategory(category: any) {
    return this.http.post(`${environment.baseUrl}/admin/categories`, {
      ...category,
    });
  }

  deleteCategory(id: number) {
    return this.http.delete(`${environment.baseUrl}/admin/categories/${id}`);
  }

  searchCategory(name: string) {
    return this.http.get<CategoryDto[]>(
      `${environment.baseUrl}/admin/searchCategories?name=${name}`
    );
  }
}
