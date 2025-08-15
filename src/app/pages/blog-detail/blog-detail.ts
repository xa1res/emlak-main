import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { BlogDetailContentComponent } from '../../components/blog/blog-detail-component/blog-detail-component';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, BlogDetailContentComponent],
  templateUrl: './blog-detail.html',
  styleUrls: ['./blog-detail.css']
})
export class BlogDetail implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  loading = false;
  blog: any | null = null;
  blogPost: any | null = null; // component’e vereceğimiz VM

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('id') ?? '';
    if (!slug) { this.blog = null; return; }
    this.fetch(slug);
    window?.scrollTo({ top: 0 });
  }

  private fetch(slug: string) {
    this.loading = true;
    this.http.get<any>(`${environment.apiUrl}/Blog/${encodeURIComponent(slug)}`).subscribe({
      next: (res) => {
        const obj = (res && typeof res === 'object' && !Array.isArray(res))
          ? (res.data ?? res.Data ?? res)
          : res;

        // HTML güvenli basım (sayfanın eski davranışı)
        if (obj?.fullContent || obj?.FullContent) {
          const html = obj.fullContent ?? obj.FullContent;
          obj.fullContent = this.sanitizer.bypassSecurityTrustHtml(html);
        }

        this.blog = obj ?? null;

        // Component’in beklediği view-model
        this.blogPost = {
          slug: obj?.slug ?? obj?.Slug ?? '',
          author: obj?.author ?? obj?.Author ?? 'admin',
          date: obj?.date ?? obj?.Date ?? '',
          title: obj?.title ?? obj?.baslik ?? obj?.Title ?? '',
          image: obj?.image ?? obj?.Image ?? obj?.imageURL ?? obj?.cover ?? '',
          snippet: obj?.snippet ?? obj?.summary ?? obj?.ozet ?? '',
          fullContent: obj?.fullContent ?? obj?.FullContent ?? ''
        };

        this.loading = false;
      },
      error: (err) => {
        console.error('Blog detayı alınamadı:', err);
        this.blog = null;
        this.blogPost = null;
        this.loading = false;
      }
    });
  }

  private sanitizeHtml(raw: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(raw ?? '');
  }
}
