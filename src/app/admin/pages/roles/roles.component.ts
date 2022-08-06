import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  test() {
    this.httpClient
      .get(`${environment.baseUrl}/random`)
      .subscribe((res) => console.log(res));
  }
}
