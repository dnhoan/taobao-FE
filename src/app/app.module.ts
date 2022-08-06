import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HeadersInterceptor } from './headers.interceptor';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
