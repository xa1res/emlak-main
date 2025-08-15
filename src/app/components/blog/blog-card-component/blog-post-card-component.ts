import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface BlogPost {
  slug: string;
  author: string;
  date: string;
  title: string;
  image: string;
  snippet: string;
}

@Component({
  selector: 'app-blog-post-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-post-card-component.html',
  styleUrls: ['./blog-post-card-component.css']
})
export class BlogPostCardComponent {
  @Input() post!: BlogPost;
}
