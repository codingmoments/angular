import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostComponent } from './post/post';

@Component( {
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [ PostComponent ]
} )
export class App implements OnInit {
  private httpClient = inject( HttpClient );

  posts: Post[] = [];

  ngOnInit(): void {
    this.httpClient.get<Post[]>( 'https://jsonplaceholder.typicode.com/posts' )
      .subscribe( ( posts ) => {
        this.posts = posts;
      } );
  }
}
