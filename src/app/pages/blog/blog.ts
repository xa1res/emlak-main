import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css']
})
export class Blog implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);

  blogs: any[] = [];
  loading = true;

  ngOnInit(): void {
    this.fetchBlogs();
  }

  private fetchBlogs(): void {
    this.loading = true;

    // DİKKAT: tek /api kullanıyoruz (environment.apiUrl = '/api')
    const params = new HttpParams(); // gerekiyorsa filtre ekleyebilirsin
    this.http.get<any>(`${environment.apiUrl}/Blog`, { params }).subscribe({
      next: (res) => {
        // {data:[...]} / {Data:[...]} / dizi senaryolarını destekle
        this.blogs = Array.isArray(res)
          ? res
          : (res?.data ?? res?.Data ?? res?.items ?? res?.Items ?? []);
        this.loading = false;
      },
      error: (err) => {
        console.error('Bloglar yüklenemedi:', err);
        this.blogs = [];
        this.loading = false;
      }
    });
  }

  goDetail(id: string) {
    this.router.navigate(['/blog', id]); // routes'ta /blog/:id olacak
  }
}
