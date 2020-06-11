import { Component } from '@angular/core';
import { fetchPosts } from '../api';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  posts = [];

  constructor() {
    fetchPosts().then(({ posts }) => (this.posts = posts));
  }
}
