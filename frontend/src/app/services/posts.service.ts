import { Injectable } from '@angular/core';

//
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private URL = 'http://localhost:3000/api';

  constructor(private _http: HttpClient) { }

  getPosts(){
    return this._http.get<any>(this.URL + '/posts');
  }

  getPostsPrivate(){
    return this._http.get<any>(this.URL + '/posts-private');
  }
}
