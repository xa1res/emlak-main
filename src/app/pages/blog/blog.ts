import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer';
import { BLOG_POSTS } from '../../../../public/assets/datas/generic-datas/blog/data';

import { BlogPostCardComponent } from '../../components/blog/blog-card-component/blog-post-card-component';

interface BlogPost {
  slug: string;
  author: string;
  date: string;
  title: string;
  image: string;
  snippet: string;
  fullContent: string;
}
 
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, Footer, BlogPostCardComponent],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class BlogComponent implements OnInit {
  blogPosts: BlogPost[] = [];

  ngOnInit(): void {
    this.blogPosts = BLOG_POSTS;
  }
}