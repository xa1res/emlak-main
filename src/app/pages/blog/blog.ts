import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer';
import { BlogPostCardComponent } from '../../components/blog/blog-card-component/blog-post-card-component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<BlogPost[]>(`${environment.apiUrl}/blogposts`).subscribe(posts => {
      this.blogPosts = posts;
    });
  }
}