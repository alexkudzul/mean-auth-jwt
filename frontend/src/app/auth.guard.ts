import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

// AuthGuard protege la rutas del frontend
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router){ }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  // Verifica si existe un token o no
  canActivate(){
    if(this._authService.loggedIn()){
      return true;
    }

    // Sino existe redireccionar a login
    this._router.navigate(['/signin']);
    return false;
  }

}
