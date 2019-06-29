import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { finalize } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  loading;
  constructor(
    public loadingController: LoadingController
  ) {}

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await this.loading.present();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      },
      "withCredentials": true
    });
    this.presentLoading();
    return next.handle(request).pipe(
      finalize(() =>  this.loading.onDidDismiss())
  );
  }
}