import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Footer } from '../footer/footer'; 
import { BlogDetailContentComponent } from '../../components/blog/blog-detail-component/blog-detail-component'; 
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// Types dosyasını bulamadığı için arayüzü buraya taşıdık
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
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, Footer, BlogDetailContentComponent],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.css'
})
export class BlogDetailComponent implements OnInit {
  blogPost: BlogPost | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const slug = params.get('slug');
      if (slug) {
        this.http.get<BlogPost>(`${environment.backendUrl}/blog/${slug}`).subscribe(
          (data: BlogPost) => {
            this.blogPost = data;
          },
          error => {
            console.error('Blog yazısı çekme hatası:', error);
            this.blogPost = undefined;
          }
        );
      }
    });
  }
}