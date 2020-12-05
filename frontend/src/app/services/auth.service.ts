import { Injectable } from '@angular/core';

//Modulo http para hacer peticiones
import { HttpClient } from '@angular/common/http';

// Enrutador
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api';
  constructor(private _http: HttpClient, private _router: Router) { }

  signUp(user){
    return this._http.post<any>(this.URL + '/signup', user)
  }

  signIn(user){
    return this._http.post<any>(this.URL + '/signin', user)
  }

  loggedIn(){
    if(localStorage.getItem('token')){
      return true;
    }
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this._router.navigate(['/signin']);
  }
}
