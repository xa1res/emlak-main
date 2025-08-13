import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Footer } from '../footer/footer';
import { BlogDetailContentComponent } from '../../components/blog/blog-detail-component/blog-detail-component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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
  imports: [CommonModule, RouterLink, Footer, BlogDetailContentComponent, NgIf],
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
        this.http.get<BlogPostDetail[]>(`${environment.apiUrl}/blogposts`).subscribe(posts => {
          this.blogPost = posts.find(post => post.slug === slug);
        });
      }
    });
  }
}