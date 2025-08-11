import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // HttpClient eklendi
import { Observable } from 'rxjs'; // Observable eklendi

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
  imports: [CommonModule, Footer, BlogPostCardComponent, HttpClientModule], // HttpClientModule eklendi
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class BlogComponent implements OnInit {
  blogPosts = signal<BlogPost[]>([]);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getBlogPosts();
  }

  getBlogPosts(): void {
    this.http
      .get<BlogPost[]>('http://localhost:3000/api/blog')
      .subscribe((data) => {
        this.blogPosts.set(data);
      });
  }
}