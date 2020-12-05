import { Injectable } from '@angular/core';

//
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';


import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

// TokenInterceptorService => Añade globalmente a la app el formato del token value =(Bearer 'token')
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private _authService: AuthService) { }

  // intercept => interceptara toda las solicitudes http y agregara un token
  // clone => clona las solicitudes y agrega las cabeceras que se desee
  intercept(req: HttpRequest <any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    console.log('Dentro de intercept', token);

    // if(!token){
    //   console.log('Dentro de if negado', token);
    //   return next.handle(req);
    // }

    const tokenizeReq = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
    });
    return next.handle(tokenizeReq);
  }

  // ------------------------- V2 -----------------------------------

  // intercept(req, next) {
  //   let tokenizeReq = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${this._authService.getToken()}`
  //     }
  //   });
  //   return next.handle(tokenizeReq);
  // }

}
