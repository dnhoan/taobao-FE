import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient, private message: NzMessageService) {}

  uploadImageProduct(file: File) {
    const formData = new FormData();
    formData.append('File', file, file.name);
    return this.http.post(`${environment.baseUrl}/uploadImage`, formData);
  }
}
