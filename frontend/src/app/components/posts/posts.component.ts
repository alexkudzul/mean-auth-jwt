import { Component, OnInit } from '@angular/core';

// Services
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts = [];
  constructor(private _postService: PostsService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this._postService.getPosts().subscribe(
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
