import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  // Browser: '/api' (proxy). SSR: tam URL
  private base = isPlatformBrowser(this.platformId)
    ? environment.apiUrl
    : (environment as any).serverApiUrl ?? 'http://localhost:5143/api';

  /** Genel: gelen şey dizi ise direkt dön, yoksa data/items içinden al */
  private pickArray = (x: any) =>
    Array.isArray(x) ? x : (x?.data || x?.items || []);

  // ---- BLOG ----
  getBlogs(params?: { page?: number; pageSize?: number }) {
    const httpParams = new HttpParams({
      fromObject: {
        page: String(params?.page ?? 1),
        pageSize: String(params?.pageSize ?? 10),
      },
    });
    return this.http
      .get<any>(`${this.base}/Blog`, { params: httpParams })
      .pipe(map(res => this.pickArray(res)));
  }

  getBlogBySlug(slug: string) {
    return this.http.get<any>(`${this.base}/Blog/${encodeURIComponent(slug)}`);
  }

  // ---- DİĞER ÖRNEKLER (istersen kullan) ----
  getIlanlar(params: any) {
    const httpParams = new HttpParams({ fromObject: params || {} });
    return this.http
      .get<any>(`${this.base}/Ilanlar`, { params: httpParams })
      .pipe(map(res => this.pickArray(res)));
  }

  getIlanById(id: string) {
    return this.http.get<any>(`${this.base}/Ilanlar/${id}`);
  }

  getDanismanlar() {
    return this.http
      .get<any>(`${this.base}/Danismanlar`)
      .pipe(map(res => this.pickArray(res)));
  }
}
