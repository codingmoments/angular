import { Component, input, Input } from '@angular/core';

@Component( {
  selector: 'app-post',
  templateUrl: './post.html',
  styleUrls: [ './post.css' ]
} )
export class PostComponent {
  title = input<string>();
  content = input<string>();
}
