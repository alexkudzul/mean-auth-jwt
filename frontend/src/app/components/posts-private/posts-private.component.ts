import { Component, OnInit } from '@angular/core';

// Service
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-posts-private',
  templateUrl: './posts-private.component.html',
  styleUrls: ['./posts-private.component.css']
})
export class PostsPrivateComponent implements OnInit {

  posts = [];
  constructor(private _postService: PostsService) { }

  ngOnInit(): void {
    this.getPostsPrivate();
  }

  getPostsPrivate(){
    this._postService.getPostsPrivate().subscribe(
      res => {
        console.log(res);
        this.posts = res;
      },
      err => {
        console.log(err);
      }
    );
  }

}
