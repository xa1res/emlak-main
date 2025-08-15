import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BlogPostCardComponent } from '../../components/blog/blog-card-component/blog-post-card-component';

interface BlogPostVM {
  slug: string;
  author: string;
  date: string;
  title: string;
  image: string;
  snippet: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, BlogPostCardComponent],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css']
})
export class Blog implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);

  loading = false;
  posts: BlogPostVM[] = [];

  ngOnInit(): void {
    this.fetch();
  }

  private fetch() {
    this.loading = true;
    this.http.get<any>(`${environment.apiUrl}/Blog`).subscribe({
      next: (res) => {
        const arr = Array.isArray(res) ? res : (res?.data ?? []);
        this.posts = (arr || []).map((b: any) => ({
          slug: b.slug ?? b.Slug ?? '',
          author: b.author ?? b.Author ?? 'admin',
          date: b.date ?? b.Date ?? '',
          title: b.title ?? b.Title ?? '',
          image: b.image ?? b.Image ?? '',
          snippet: b.snippet ?? b.Snippet ?? ''
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Bloglar yüklenemedi:', err);
        this.posts = [];
        this.loading = false;
      }
    });
  }

  goDetail(slug: string) {
    if (!slug) return;
    this.router.navigate(['/blog', slug]);
  }
}
