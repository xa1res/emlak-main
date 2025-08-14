import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-detail.html',
  styleUrls: ['./blog-detail.css']
})
export class BlogDetail implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  blog: any | null = null;
  loading = true;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // /blog/:id
      if (id) this.fetchBlogDetail(id);
      else this.loading = false;
    });
  }

  private fetchBlogDetail(id: string): void {
    this.loading = true;

    // Backend: /api/Blog/{id}
    this.http.get<any>(`${environment.apiUrl}/Blog/${encodeURIComponent(id)}`).subscribe({
      next: (res) => {
        // Tek obje veya {data:{...}}
        const obj = (res && typeof res === 'object' && !Array.isArray(res))
          ? (res.data ?? res.Data ?? res)
          : res;

        // İçerik HTML ise güvenli şekilde bas
        if (obj?.fullContent || obj?.FullContent) {
          const html = obj.fullContent ?? obj.FullContent;
          obj.fullContent = this.sanitizeHtml(html);
        }

        this.blog = obj ?? null;
        this.loading = false;
      },
      error: (err) => {
        console.error('Blog detayı alınamadı:', err);
        this.blog = null;
        this.loading = false;
      }
    });
  }

  private sanitizeHtml(raw: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(raw ?? '');
  }
}
