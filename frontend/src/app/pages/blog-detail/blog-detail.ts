import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Footer } from '../footer/footer';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { BlogDetailContentComponent } from '../../components/blog/blog-detail-component/blog-detail-component';

interface BlogPostDetail {
  slug: string;
  author: string;
  date: string;
  title: string;
  image: string;
  snippet: string;
  fullContent: string;
}

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, Footer, BlogDetailContentComponent, NgIf, HttpClientModule],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.css'
})
export class BlogDetailComponent implements OnInit {
  blogPost: BlogPostDetail | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const slug = params.get('slug');
      if (slug) {
        this.http.get<BlogPostDetail>(`http://localhost:3000/api/blog/${slug}`).subscribe(post => {
          this.blogPost = post;
        });
      }
    });
  }
}